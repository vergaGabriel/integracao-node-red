const mqtt = require('mqtt');

// Conecta no seu Mosquitto local rodando no Docker
const client = mqtt.connect('mqtt://localhost:1883');

const topic = 'faculdade/iot/dados';

client.on('connect', () => {
    console.log('Subscriber conectado e aguardando mensagens...');
    
    client.subscribe(topic, (err) => {
        if (!err) {
            console.log(`| Inscrito com sucesso no tópico: ${topic}`);
            console.log('| -------------------------------------------');
        } else {
            console.error('Erro ao se inscrever:', err);
        }
    });
});

client.on('message', (topic, message) => {
    const payload = message.toString();
    
    try {
        const data = JSON.parse(payload);
        console.log(`📩 Nova mensagem em [${topic}]:`, data);
    } catch (e) {
        // Se não for JSON, exibe o texto puro
        console.log(`📩 Nova mensagem em [${topic}]: ${payload}`);
    }
});

client.on('error', (err) => {
    console.error('Erro no Subscriber:', err);
});