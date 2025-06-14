import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#800000',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  reactLogo: {
    height: 178,
    width: 290,
    resizeMode: 'contain',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aa4a44',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff0f0',
    color: '#000',
    width: '100%',
  },
  formBox: {
    maxWidth: 360,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
    gap: 12,
  },
  buttonContainer: {
    marginTop: 16,
    width: '100%',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#ffffff',
  },
  defaultText: {
    fontSize: 16,
    color: '#f8f8f8',
  },
});

export default styles;
