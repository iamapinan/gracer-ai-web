#!/bin/sh
set -eu

snippet_dir=/etc/nginx/snippets
snippet_file="$snippet_dir/contact-webhook.conf"
webhook_url="${VITE_DISCORD_WEBHOOK_URL:-}"

mkdir -p "$snippet_dir"

case "$webhook_url" in
  https://discord.com/api/webhooks/*|https://discordapp.com/api/webhooks/*)
    cat > "$snippet_file" <<EOF
proxy_pass $webhook_url;
proxy_ssl_server_name on;
proxy_set_header Host discord.com;
proxy_set_header Content-Type application/json;
EOF
    ;;
  *)
    echo "Discord contact webhook is missing or invalid; /api/contact will return 503." >&2
    cat > "$snippet_file" <<'EOF'
return 503;
EOF
    ;;
esac
