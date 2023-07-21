import { Button, Image, View, StyleSheet } from 'react-native';
import GoogleLogo from '../assets/search.png'; // Mettez ici le chemin de votre logo Google

export default function GoogleSignInButton({ onPress }) {
  return (
    <View style={styles.button}>
      <Image source={GoogleLogo} style={styles.logo} />
      <Button
        title="S'inscrire avec Google"
        onPress={onPress}
        color="#0c6157" // Vous pouvez ajuster la couleur pour correspondre à celle de Google
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,

  },
  logo: {
    marginRight: 0, // réduire la marge à droite
    padding:5,
    backgroundColor:'white',
    height: 36,
    width: 36,
    borderTopLeftRadius:4,
    borderBottomLeftRadius:4
  },
});
