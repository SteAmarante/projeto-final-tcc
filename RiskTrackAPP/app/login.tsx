import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

// Necessário para o fluxo de autenticação funcionar corretamente no modo de desenvolvimento web/Expo Go
WebBrowser.maybeCompleteAuthSession();

// Componente SVG para o ícone do Google
const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.519-3.534-11.084-8.294l-6.573,4.818C9.231,39.399,16.035,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C39.986,36.639,44,30.836,44,24C44,22.659,43.862,21.35,43.611,20.083z"></p>
    </svg>
);


export default function LoginScreen() {
  // ATENÇÃO: Substitua pelos seus próprios IDs de cliente do Google Cloud Console
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'SEU_EXPO_CLIENT_ID_AQUI.apps.googleusercontent.com',
    iosClientId: 'SEU_IOS_CLIENT_ID_AQUI.apps.googleusercontent.com',
    androidClientId: 'SEU_ANDROID_CLIENT_ID_AQUI.apps.googleusercontent.com',
    webClientId: 'SEU_WEB_CLIENT_ID_AQUI.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // Aqui você tem o token de acesso.
      // Você pode usá-lo para obter informações do usuário ou autenticar com seu backend.
      console.log('Login com Google bem-sucedido!', authentication);
      Alert.alert('Sucesso', 'Login com Google realizado com sucesso!');
      // TODO: Navegar para a próxima tela após o login
    } else if (response?.type === 'error') {
      console.error('Erro no login com Google:', response.error);
      Alert.alert('Erro', 'Não foi possível fazer login com o Google.');
    }
  }, [response]);

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
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      >
        <GoogleIcon />
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
