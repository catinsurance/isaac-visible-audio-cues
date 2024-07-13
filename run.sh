tskill isaac-ng || true
rm -rf "$MOD_DIST_PATH"
cp -r "./dist" "$MOD_DIST_PATH"
steam.exe -applaunch 250900
