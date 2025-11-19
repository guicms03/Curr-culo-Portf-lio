import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Share,
  Alert,
} from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const imageAnim = useRef(new Animated.Value(0)).current;
  const [frase, setFrase] = useState("");

  const frases = [
    "Cada bug resolvido é uma vitória.",
    "Confie no seu processo.",
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(imageAnim, { toValue: -10, duration: 800, useNativeDriver: true }),
        Animated.timing(imageAnim, { toValue: 10, duration: 800, useNativeDriver: true }),
        Animated.timing(imageAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const handleShare = async () => {
    try {
      await Share.share({
        message:
          "Confira meu portfólio completo desenvolvido em React Native com Expo!\n\nAcesse: https://meuportfolio.expo.dev",
      });
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao tentar compartilhar.");
    }
  };

  const gerarFrase = () => {
    const aleatoria = frases[Math.floor(Math.random() * frases.length)];
    setFrase(aleatoria);
  };

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <LinearGradient
      colors={["#f96098FF", "#C74B46FF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Verifique se o arquivo existe: ../assets/images/foto_perfil.jpeg */}
          <Animated.Image
            source={require("../assets/images/foto_perfil.jpeg")}
            style={[styles.image, { transform: [{ translateY: imageAnim }] }]}
          />

          <Text style={styles.title}>Bem-vindo(a) ao meu Portfólio!</Text>

          <Text style={styles.subtitle}>
            Sou <Text style={styles.highlight}>Guilherme Martins Queiroz de Oliveira</Text>,{"\n"}
            dono desse site e fico muito feliz com a sua visita!{"\n\n"}
            Aqui você pode conhecer melhor minhas experiências, projetos e muito mais!
          </Text>

          <View style={styles.buttonsContainer}>
            <Link href="/profissional" asChild>
              <AnimatedTouchable style={styles.button} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Minha Experiência Profissional</Text>
              </AnimatedTouchable>
            </Link>

            <Link href="/academica" asChild>
              <AnimatedTouchable style={styles.button} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Minha Experiência Acadêmica</Text>
              </AnimatedTouchable>
            </Link>

            <Link href="/projetos" asChild>
              <AnimatedTouchable style={styles.button} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Meus Projetos</Text>
              </AnimatedTouchable>
            </Link>

            <Link href="/sobre" asChild>
              <AnimatedTouchable style={styles.button} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Sobre</Text>
              </AnimatedTouchable>
            </Link>

            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Text style={styles.shareText}>Compartilhar meu Portfólio</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.extraButton} onPress={gerarFrase}>
              <Text style={styles.extraText}>Mensagens para Devs</Text>
            </TouchableOpacity>

            {frase ? <Text style={styles.frase}>{frase}</Text> : null}
          </View>
        </ScrollView>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 25,
    borderWidth: 4,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 2, height: 4 },
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#f8f8f8",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  highlight: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 4 },
    width: "85%",
    marginBottom: 12,
    elevation: 4,
  },
  buttonText: {
    color: "#ed6381FF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  shareButton: {
    marginTop: 8,
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 12,
    width: "85%",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 4 },
    elevation: 4,
    marginBottom: 12,
  },
  shareText: {
    color: "#c74b46",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  extraButton: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 12,
    width: "85%",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 4 },
    elevation: 4,
    marginBottom: 12,
  },
  extraText: {
    color: "#c74b46",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  frase: {
    marginTop: 15,
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});