import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// // Componente SVG para o ícone do Google
// const GoogleIcon = () => (
//     <svg width="20" height="20" viewBox="0 0 48 48">
//         <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
//         <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
//         <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.519-3.534-11.084-8.294l-6.573,4.818C9.231,39.399,16.035,44,24,44z"></path>
//         <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C39.986,36.639,44,30.836,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
//     </svg>
// );

// Configura o Google Sign-In
GoogleSignin.configure({
  webClientId: '1022624158718-ju05s7csf7v868on0p2t3hg0c1rc3lsb.apps.googleusercontent.com',
});

export default function LoginScreen() {
async function onGoogleButtonPress() {
    try {
      // 1. Verifica se os serviços do Google Play estão disponíveis
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      // 2. Inicia o fluxo de login do Google. 
      // Usamos 'any' para contornar um erro de tipagem do TypeScript.
      const userInfo: any = await GoogleSignin.signIn();
      const idToken = userInfo.idToken;

      if (!idToken) {
        throw new Error("O token de ID do Google não foi obtido.");
      }

      console.log("ID Token obtido do Google: ", idToken);

      // 3. Cria uma credencial do Firebase com o token do Google
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log("Credencial do Firebase criada.");

      // 4. Faz o login no Firebase com a credencial
      const userCredential = await auth().signInWithCredential(googleCredential);
      console.log('Login com Google e Firebase bem-sucedido!', userCredential.user);
      Alert.alert('Sucesso!', `Bem-vindo, ${userCredential.user.displayName}!`);
      // TODO: Navegar para a próxima tela após o login (ex: Dashboard)

    } catch (error: any) {
      if (error.code === '12501') { // SIGN_IN_CANCELLED
        console.log('Utilizador cancelou o fluxo de login.');
      } else {
        console.error('Erro no login com Google:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login com o Google.');
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Campos de login tradicionais (desabilitados por enquanto) */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#A0AEC0"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A0AEC0"
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      
      <Text style={styles.orText}>Or login with</Text>

      {/* Botão de Login com Google */}
      <TouchableOpacity
        style={styles.googleButton}
        onPress={onGoogleButtonPress}
      >
        {/* <GoogleIcon /> */}
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>
      
      <Text style={styles.footerText}>Don't have an account? Sign up</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0A2540',
    marginBottom: 40,
    alignSelf: 'flex-start'
  },
  input: {
    width: '100%',
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    borderColor: '#E2E8F0',
    borderWidth: 1,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#0052CC',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    color: '#A0AEC0',
    marginVertical: 25,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 8,
    borderColor: '#E2E8F0',
    borderWidth: 1,
  },
  googleButtonText: {
    color: '#2D3748',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  footerText: {
    position: 'absolute',
    bottom: 30,
    color: '#718096',
  },
});

