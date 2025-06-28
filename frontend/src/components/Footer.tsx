const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="text-lg font-semibold mb-3">Holidays.com</h4>
          <p className="text-sm text-blue-200">Book your dream vacation with confidence.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-blue-100">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/my-bookings" className="hover:underline">My Bookings</a></li>
            <li><a href="/my-hotels" className="hover:underline">My Hotels</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact</h4>
          <p className="text-sm text-blue-200">Email: support@holidays.com</p>
          <p className="text-sm text-blue-200">Phone: +94 71 234 5678</p>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-blue-300">
        &copy; {new Date().getFullYear()} Holidays.com. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
