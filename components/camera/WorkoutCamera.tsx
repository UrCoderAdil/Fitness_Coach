import { CameraView, useCameraPermissions } from 'expo-camera';
import { ReactNode, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  active: boolean;
  children?: ReactNode;
};

export function WorkoutCamera({ active, children }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const facing = useMemo(() => 'front' as const, []);

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text style={styles.hint}>Checking camera permission…</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.hint}>Camera access is needed for live coaching.</Text>
        <Text style={styles.link} onPress={() => requestPermission()}>
          Grant permission
        </Text>
      </View>
    );
  }

  return (
    <CameraView style={StyleSheet.absoluteFill} facing={facing} active={active}>
      {children}
    </CameraView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#111',
  },
  hint: {
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 12,
  },
  link: {
    color: '#6ee7b7',
    fontWeight: '700',
    fontSize: 16,
  },
});
