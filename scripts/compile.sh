../src/closure-library/closure/bin/build/closurebuilder.py \
  --root=../src/closure-library/ \
  --root=../src/rocket/ \
  --namespace="rocket.player.Player" \
  --output_mode=compiled \
  --compiler_jar=../../compiler.jar \
  --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" \
  > ../bin/RocketPlayer.js
