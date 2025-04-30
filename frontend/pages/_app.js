// frontend/pages/_app.js
import '../styles/globals.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';

export default function App({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
      <ChatWidget />
    </>
  );
}
