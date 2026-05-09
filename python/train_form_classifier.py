"""Train per-exercise form classifier — requires labeled landmark tensors (README)."""
import sys


def main() -> None:
    try:
        import tensorflow as tf  # noqa: F401
    except ImportError:
        print("Install tensorflow: pip install tensorflow", file=sys.stderr)
        sys.exit(1)
    print("Stub: wire X_train/y_train from processed landmarks (see README).")


if __name__ == "__main__":
    main()
