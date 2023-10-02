import React, { useEffect, useState } from "react";
import mqtt from "mqtt";

const Index = () => {
  const brokerUrl = "ws://IPADRESS:8083/mqtt"; // IPADRESS is your server adress
  const username = "username"; // Replace with your MQTT broker username
  const password = "password"; // Replace with your MQTT broker password
  const topic = "topic"; // Create a topic and rename it
  const [messages, setMessages] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);
  useEffect(() => {
    const options = {
      username,
      password,
    };

    const client = mqtt.connect(brokerUrl, options);

    // Connect when the component mounts
    client.on("connect", () => {
      console.log("MQTT client connected");
      client.subscribe(topic); // Replace with the topic you want to subscribe to
    });

    // Handle incoming messages
    client.on("message", (topic, message) => {
      console.log(`Received message on topic: ${topic}`);
      console.log(`Message: ${message.toString()}`);
      setMessages(message.toString().split("-"));
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeoutId = setTimeout(() => {
        setMessages("");
      }, 5000);

      setTimeoutId(newTimeoutId);
    });

    // Disconnect when the component unmounts
    return () => {
      client.end();
      console.log("MQTT client disconnected");
    };
  }, [timeoutId]);
  return <div>{messages[0]}</div>;
};

export default Index;
