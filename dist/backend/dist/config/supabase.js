"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = exports.supabaseAdmin = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const environment_1 = require("./environment");
exports.supabaseAdmin = (0, supabase_js_1.createClient)(environment_1.env.SUPABASE_URL, environment_1.env.SUPABASE_SERVICE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});
exports.supabase = (0, supabase_js_1.createClient)(environment_1.env.SUPABASE_URL, environment_1.env.SUPABASE_ANON_KEY);
//# sourceMappingURL=supabase.js.map