export default function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <div className="container text-center">
        <p className="mb-0">&copy; {new Date().getFullYear()} Alhana Restaurant. All rights reserved.</p>
        <small>Made with ❤️ by Alhana Team</small>
      </div>
    </footer>
  );
}
