# Script to copy over all contents from project to current location
echo "API - Copying from Dist...."
cp -a ../../../react-workspace/priti-vignesh-wedding-site/dist/. ../../ss-wedding
echo "Copied! "
echo "API - Deleting source location..."
rm -rf ../../../react-workspace/priti-vignesh-wedding-site/dist
echo "API - Deleted - source location! "

echo "UI - Copying from Frontend..."
cp -a ../../../react-workspace/priti-vignesh-wedding-site/src/public/. ../../ss-wedding/public
echo "Copied! "
