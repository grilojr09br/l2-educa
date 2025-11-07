import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * GlassShader - WebGL-powered glass effect renderer
 * Based on the Glass Material Editor by Daniela Muntyan
 */
export default function GlassShader({ 
  backgroundImage = null,
  uniforms = {},
  className = '',
  onReady = null
}) {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const textureRef = useRef(null);
  const animationRef = useRef();
  const startTimeRef = useRef(Date.now());
  const imageAspectRef = useRef(1);
  const lastResizeRef = useRef('');
  const uniformLocationsRef = useRef({});
  
  const [isReady, setIsReady] = useState(false);

  // Default uniforms
  const defaultUniforms = {
    width: 300,
    height: 120,
    mouseX: 0,
    mouseY: 0,
    tintR: 0.98,
    tintG: 1.0,
    tintB: 0.95,
    saturation: 1.0,
    distortion: 2.5,
    blur: 2.5,
    cornerRadius: 24,
    chromaticAberration: 1.0,
    shadowIntensity: 0.2,
    shadowOffsetX: 0,
    shadowOffsetY: 8,
    shadowBlur: 20,
    ...uniforms
  };

  const vertexShaderSource = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;
    
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
      v_texCoord = a_texCoord;
    }
  `;

  const fragmentShaderSource = `
    precision mediump float;
    
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform sampler2D u_texture;
    uniform float u_width;
    uniform float u_height;
    uniform vec3 u_tint;
    uniform float u_saturation;
    uniform float u_distortion;
    uniform float u_blur;
    uniform float u_imageAspect;
    uniform float u_canvasAspect;
    uniform float u_shadowIntensity;
    uniform vec2 u_shadowOffset;
    uniform float u_shadowBlur;
    uniform float u_cornerRadius;
    uniform float u_chromaticAberration;
    
    varying vec2 v_texCoord;
    
    vec2 getCoverUV(vec2 uv, float imageAspect, float canvasAspect) {
      vec2 coverUV = uv;
      
      if (imageAspect > canvasAspect) {
        float scale = canvasAspect / imageAspect;
        coverUV.x = (uv.x - 0.5) * scale + 0.5;
      } else {
        float scale = imageAspect / canvasAspect;
        coverUV.y = (uv.y - 0.5) * scale + 0.5;
      }
      
      return coverUV;
    }
    
    float sdRoundedRect(vec2 pos, vec2 halfSize, float radius) {
      vec2 q = abs(pos) - halfSize + radius;
      return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - radius;
    }
    
    float boxSDF(vec2 uv) {
      return sdRoundedRect(uv, vec2(u_width, u_height), u_cornerRadius);
    }
    
    float shadowSDF(vec2 uv) {
      vec2 shadowPos = uv - u_shadowOffset;
      return sdRoundedRect(shadowPos, vec2(u_width, u_height), u_cornerRadius);
    }
    
    vec2 randomVec2(vec2 co) {
      return fract(sin(vec2(
        dot(co, vec2(127.1, 311.7)),
        dot(co, vec2(269.5, 183.3))
      )) * 43758.5453);
    }
    
    vec3 sampleWithNoise(vec2 uv, float timeOffset, float mipLevel) {
      vec2 coverUV = getCoverUV(uv, u_imageAspect, u_canvasAspect);
      vec2 offset = randomVec2(coverUV + vec2(u_time + timeOffset)) / u_resolution.x;
      return texture2D(u_texture, coverUV + offset * pow(2.0, mipLevel) * 0.01).rgb;
    }
    
    vec3 sampleWithChromaticAberration(vec2 uv, float timeOffset, float mipLevel, float aberrationStrength) {
      if (aberrationStrength <= 0.0) {
        return sampleWithNoise(uv, timeOffset, mipLevel);
      }
      
      vec2 coverUV = getCoverUV(uv, u_imageAspect, u_canvasAspect);
      vec2 center = vec2(0.5);
      vec2 direction = normalize(coverUV - center);
      float distance = length(coverUV - center);
      
      float aberrationOffset = aberrationStrength * distance * 0.01;
      
      vec2 offset = randomVec2(coverUV + vec2(u_time + timeOffset)) / u_resolution.x;
      vec2 noiseOffset = offset * pow(2.0, mipLevel) * 0.01;
      
      float r = texture2D(u_texture, coverUV + direction * aberrationOffset * 1.2 + noiseOffset).r;
      float g = texture2D(u_texture, coverUV + noiseOffset).g;
      float b = texture2D(u_texture, coverUV - direction * aberrationOffset * 0.8 + noiseOffset).b;
      
      return vec3(r, g, b);
    }
    
    vec3 getBlurredColor(vec2 uv, float mipLevel) {
      return (
        sampleWithChromaticAberration(uv, 0.0, mipLevel, u_chromaticAberration) +
        sampleWithChromaticAberration(uv, 0.3, mipLevel, u_chromaticAberration) +
        sampleWithChromaticAberration(uv, 0.6, mipLevel, u_chromaticAberration) +
        sampleWithChromaticAberration(uv, 0.9, mipLevel, u_chromaticAberration) +
        sampleWithChromaticAberration(uv, 1.2, mipLevel, u_chromaticAberration)
      ) * 0.2;
    }
    
    vec3 saturate(vec3 color, float factor) {
      float gray = dot(color, vec3(0.299, 0.587, 0.114));
      return mix(vec3(gray), color, factor);
    }
    
    vec2 computeRefractOffset(float sdf, vec2 fragCoord) {
      if (sdf < 0.1) {
        return vec2(0.0);
      }
      
      float epsilon = 2.0;
      vec2 h = vec2(epsilon, 0.0);
      vec2 centeredUV1 = (fragCoord + h.xy) - u_mouse;
      vec2 centeredUV2 = (fragCoord - h.xy) - u_mouse;
      vec2 centeredUV3 = (fragCoord + h.yx) - u_mouse;
      vec2 centeredUV4 = (fragCoord - h.yx) - u_mouse;
      
      float sdf1 = boxSDF(centeredUV1);
      float sdf2 = boxSDF(centeredUV2);
      float sdf3 = boxSDF(centeredUV3);
      float sdf4 = boxSDF(centeredUV4);
      
      vec2 grad = normalize(vec2(sdf1 - sdf2, sdf3 - sdf4));
      
      float offsetAmount = pow(abs(sdf), 12.0) * -0.05 * u_distortion;
      return grad * offsetAmount;
    }
    
    float highlight(float sdf, vec2 fragCoord) {
      if (sdf < 0.1) {
        return 0.0;
      }
      
      float epsilon = 2.0;
      vec2 h = vec2(epsilon, 0.0);
      vec2 centeredUV1 = (fragCoord + h.xy) - u_mouse;
      vec2 centeredUV2 = (fragCoord - h.xy) - u_mouse;
      vec2 centeredUV3 = (fragCoord + h.yx) - u_mouse;
      vec2 centeredUV4 = (fragCoord - h.yx) - u_mouse;
      
      float sdf1 = boxSDF(centeredUV1);
      float sdf2 = boxSDF(centeredUV2);
      float sdf3 = boxSDF(centeredUV3);
      float sdf4 = boxSDF(centeredUV4);
      
      vec2 grad = normalize(vec2(sdf1 - sdf2, sdf3 - sdf4));
      
      return 1.0 - clamp(pow(1.0 - abs(dot(grad, vec2(-0.707, 0.707))), 0.5), 0.0, 1.0);
    }
    
    float gaussianBlur(vec2 uv, float blurSize) {
      float total = 0.0;
      float totalWeight = 0.0;
      float radius = min(blurSize, 15.0);
      
      for (int x = -15; x <= 15; x++) {
        for (int y = -15; y <= 15; y++) {
          if (float(x) >= -radius && float(x) <= radius && 
              float(y) >= -radius && float(y) <= radius) {
            
            vec2 samplePos = (uv * u_resolution + vec2(float(x), float(y))) - u_mouse;
            float weight = exp(-(float(x*x + y*y)) / (2.0 * radius * radius));
            float shadowValue = 1.0 - clamp(shadowSDF(samplePos), 0.0, 1.0);
            
            total += weight * shadowValue;
            totalWeight += weight;
          }
        }
      }
      
      return totalWeight > 0.0 ? total / totalWeight : 0.0;
    }
    
    void main() {
      vec2 fragCoord = v_texCoord * u_resolution;
      vec2 centeredUV = fragCoord - u_mouse;
      float sdf = boxSDF(centeredUV);
      
      float normalizedInside = (sdf / u_height) + 1.0;
      float edgeBlendFactor = pow(normalizedInside, 12.0);
      
      vec2 coverUV = getCoverUV(v_texCoord, u_imageAspect, u_canvasAspect);
      vec3 baseTex = texture2D(u_texture, coverUV).rgb;
      
      // Shadow rendering
      float shadowMask = 0.0;
      if (u_shadowIntensity > 0.0) {
        shadowMask = gaussianBlur(v_texCoord, u_shadowBlur);
        shadowMask *= u_shadowIntensity;
      }
      
      vec2 sampleUV = v_texCoord + computeRefractOffset(normalizedInside, fragCoord);
      float mipLevel = mix(3.5 * u_blur, 1.5, edgeBlendFactor);
      
      vec3 blurredTex = getBlurredColor(sampleUV, mipLevel);
      
      blurredTex = mix(blurredTex, pow(saturate(blurredTex, u_saturation), vec3(0.5)), edgeBlendFactor);
      
      blurredTex *= u_tint;
      
      // Light glass mode with subtle highlight
      blurredTex += mix(0.0, 0.3, clamp(highlight(normalizedInside, fragCoord) * pow(edgeBlendFactor, 5.0), 0.0, 1.0));
      blurredTex = mix(blurredTex, blurredTex * 1.1, 0.2);
      
      float boxMask = 1.0 - clamp(sdf, 0.0, 1.0);
      
      vec3 shadowedBackground = mix(baseTex, baseTex * (1.0 - shadowMask), step(0.01, shadowMask));
      
      gl_FragColor = vec4(mix(shadowedBackground, blurredTex, vec3(boxMask)), 1.0);
    }
  `;

  const createShader = useCallback((gl, type, source) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    
    return shader;
  }, []);

  const createProgram = useCallback((gl, vertexShader, fragmentShader) => {
    const program = gl.createProgram();
    if (!program) return null;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    
    return program;
  }, []);

  const createDefaultTexture = useCallback((gl) => {
    const canvas2d = document.createElement('canvas');
    canvas2d.width = canvas2d.height = 512;
    const ctx = canvas2d.getContext('2d');
    
    // Create a soft gradient background
    const gradient = ctx.createLinearGradient(0, 0, 512, 512);
    gradient.addColorStop(0, '#e0e7ff');
    gradient.addColorStop(1, '#fce7f3');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    return canvas2d;
  }, []);

  const loadTexture = useCallback((gl, imageUrl) => {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    
    const defaultCanvas = createDefaultTexture(gl);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, defaultCanvas);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    if (imageUrl) {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = () => {
        imageAspectRef.current = image.width / image.height;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      };
      image.onerror = () => {
        console.warn('Failed to load image:', imageUrl);
      };
      image.src = imageUrl;
    } else {
      imageAspectRef.current = 1.0;
    }
    
    return texture;
  }, [createDefaultTexture]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    glRef.current = gl;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) return;

    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    programRef.current = program;
    
    // Cache uniform locations
    const uniformNames = [
      'u_time', 'u_resolution', 'u_mouse', 'u_texture', 'u_width', 'u_height',
      'u_tint', 'u_saturation', 'u_distortion', 'u_blur', 'u_imageAspect',
      'u_canvasAspect', 'u_shadowIntensity', 'u_shadowOffset', 
      'u_shadowBlur', 'u_cornerRadius', 'u_chromaticAberration'
    ];
    
    const locations = {};
    uniformNames.forEach(name => {
      locations[name] = gl.getUniformLocation(program, name);
    });
    uniformLocationsRef.current = locations;

    // Setup vertices
    const vertices = new Float32Array([
      -1, -1, 0, 1,
       1, -1, 1, 1,
      -1,  1, 0, 0,
       1,  1, 1, 0,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');

    gl.enableVertexAttribArray(positionLocation);
    gl.enableVertexAttribArray(texCoordLocation);

    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 16, 0);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 16, 8);

    textureRef.current = loadTexture(gl, backgroundImage);

    setTimeout(() => {
      setIsReady(true);
      onReady?.();
    }, 100);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [backgroundImage, createShader, createProgram, loadTexture, onReady]);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const gl = glRef.current;
      const program = programRef.current;
      const texture = textureRef.current;

      if (!canvas || !gl || !program || !texture) return;

      const currentSize = `${canvas.offsetWidth}x${canvas.offsetHeight}`;
      if (lastResizeRef.current !== currentSize) {
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        gl.viewport(0, 0, canvas.width, canvas.height);
        lastResizeRef.current = currentSize;
      }

      const canvasAspect = canvas.width / canvas.height;

      gl.useProgram(program);

      const locations = uniformLocationsRef.current;

      gl.uniform1f(locations.u_time, (Date.now() - startTimeRef.current) / 1000);
      gl.uniform2f(locations.u_resolution, canvas.width, canvas.height);
      gl.uniform2f(locations.u_mouse, defaultUniforms.mouseX * window.devicePixelRatio, defaultUniforms.mouseY * window.devicePixelRatio);
      gl.uniform1i(locations.u_texture, 0);
      gl.uniform1f(locations.u_width, defaultUniforms.width);
      gl.uniform1f(locations.u_height, defaultUniforms.height);
      gl.uniform3f(locations.u_tint, defaultUniforms.tintR, defaultUniforms.tintG, defaultUniforms.tintB);
      gl.uniform1f(locations.u_saturation, defaultUniforms.saturation);
      gl.uniform1f(locations.u_distortion, defaultUniforms.distortion);
      gl.uniform1f(locations.u_blur, defaultUniforms.blur);
      gl.uniform1f(locations.u_imageAspect, imageAspectRef.current);
      gl.uniform1f(locations.u_canvasAspect, canvasAspect);
      gl.uniform1f(locations.u_shadowIntensity, defaultUniforms.shadowIntensity);
      gl.uniform2f(locations.u_shadowOffset, defaultUniforms.shadowOffsetX, defaultUniforms.shadowOffsetY);
      gl.uniform1f(locations.u_shadowBlur, defaultUniforms.shadowBlur);
      gl.uniform1f(locations.u_cornerRadius, defaultUniforms.cornerRadius);
      gl.uniform1f(locations.u_chromaticAberration, defaultUniforms.chromaticAberration);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [defaultUniforms]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  );
}

