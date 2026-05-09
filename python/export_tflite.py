"""Export trained Keras model to float16 TFLite (README)."""
import sys


def main() -> None:
    try:
        import tensorflow as tf  # noqa: F401
    except ImportError:
        print("Install tensorflow: pip install tensorflow", file=sys.stderr)
        sys.exit(1)
    print("Stub: converter.convert() → ../assets/models/<exercise>_grader.tflite")


if __name__ == "__main__":
    main()
