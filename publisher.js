const mqtt = require('mqtt');

// Configurações
const BROKER_LOCAL = 'mqtt://localhost:1883';
const TOPICO_ENERGIA = 'iot/energia'; // Ajustado para o que combinamos no Node-RED

const client = mqtt.connect(BROKER_LOCAL);

client.on('connect', () => {
    console.log('Conectado ao Mosquitto Local!');
    
    setInterval(() => {
        // Criando o objeto exatamente como o Gauge do Node-RED espera
        const mensagem = {
            sensor: "Simulador_Fisico",
            dispositivo: "Chuveiro",
            potencia_w: Math.floor(Math.random() * (4500 - 100) + 100), // Valor numérico para o gráfico
            voltagem: 220,
            timestamp: new Date().toISOString()
        };

        client.publish(TOPICO_ENERGIA, JSON.stringify(mensagem), { qos: 1 }, () => {
            console.log(`📡 Enviado para ${TOPICO_ENERGIA}: ${mensagem.potencia_w}W`);
        });
    }, 5000); // Envia a cada 5 segundos
});

client.on('error', (err) => {
    console.error('Erro na conexão:', err);
});