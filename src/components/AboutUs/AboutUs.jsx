import React from 'react';
import { Container } from 'react-bootstrap';
import './AboutUs.css'

const About = () => {
  return (
    <Container className="my-5">
      <h2>About Us</h2>
      <p>
        Welcome to <strong>TrendBazz</strong>, your one-stop destination for the latest and greatest in fashion, electronics, and lifestyle products. Founded with a passion for quality and style, we strive to bring you a carefully curated selection of products that meet your everyday needs and spark joy.
      </p>
      <p>
        At TrendBazz, we believe shopping should be simple, enjoyable, and rewarding. That’s why we focus on offering top-notch customer service, fast shipping, and unbeatable prices. Our team works tirelessly to source only the best items from trusted brands, ensuring you get the best value every time you shop with us.
      </p>
      <p>
        Whether you’re looking to upgrade your wardrobe, find the perfect gadget, or discover new trends, TrendBazz is here to make it easy and fun. Thank you for choosing us as your favorite online store — we’re excited to be part of your journey!
      </p>
    </Container>
  );
};

export default About;