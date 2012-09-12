file_start="if (!RocketBox) var RocketBox = (function () { "
file_end=" return RocketBox; })();"
file_code=`../src/closure-library/closure/bin/build/closurebuilder.py \
  --root=../src/closure-library/ \
  --root=../src/rocket/ \
  --namespace="rocket.rocketbox.RocketBox" \
  --output_mode=compiled \
  --compiler_jar=../../compiler.jar \
  --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS"`
echo "$file_start $file_code $file_end" > ../bin/RocketBox.js