../src/closure-library/closure/bin/build/closurebuilder.py \
  --root=../src/closure-library/ \
  --root=../src/rocket/ \
  --namespace="rocket.rocketbox.RocketBox" \
  --output_mode=compiled \
  --compiler_jar=../../compiler.jar \
  --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" \
  > ../bin/RocketBox.js
