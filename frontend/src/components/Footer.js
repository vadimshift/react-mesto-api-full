function Footer() {
  const date = new Date().getFullYear()
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {date} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
