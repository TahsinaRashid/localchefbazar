import { Link } from "react-router-dom";
import { LucideFacebook, LucideTwitter, LucideInstagram, LucideMail, LucidePhone, LucideMapPin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                
                {/* Column 1: Brand & About */}
                <div className="space-y-4">
                    <Link to="/" className="text-2xl font-black text-orange-500 tracking-wide">
                        LocalChefBazaar
                    </Link>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Connecting passionate home cooks with food lovers. Experience fresh, healthy, and affordable home-cooked meals delivered right to your doorstep.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div>
                    <h2 className="text-white font-semibold text-lg mb-4">Quick Links</h2>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link to="/" className="hover:text-orange-500 transition duration-200">Home</Link>
                        </li>
                        <li>
                            <Link to="/meals" className="hover:text-orange-500 transition duration-200">Explore Meals</Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-orange-500 transition duration-200">About Us</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-orange-500 transition duration-200">Contact Us</Link>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Contact Info */}
                <div>
                    <h2 className="text-white font-semibold text-lg mb-4">Contact Info</h2>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li className="flex items-center gap-2">
                            <LucideMapPin size={16} className="text-orange-500" />
                            <span>Dhaka, Bangladesh</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <LucidePhone size={16} className="text-orange-500" />
                            <span>+880 1234-567890</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <LucideMail size={16} className="text-orange-500" />
                            <span>support@localchefbazaar.com</span>
                        </li>
                    </ul>
                </div>

                {/* Column 4: Social Media & Newsletter */}
                <div>
                    <h2 className="text-white font-semibold text-lg mb-4">Follow Us</h2>
                    <div className="flex gap-4 mb-4">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 hover:text-white transition duration-200">
                            <LucideFacebook size={18} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 hover:text-white transition duration-200">
                            <LucideTwitter size={18} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 hover:text-white transition duration-200">
                            <LucideInstagram size={18} />
                        </a>
                    </div>
                    <p className="text-xs text-gray-500">
                        Join our community and support local home chefs.
                    </p>
                </div>

            </div>

            {/* Divider */}
            <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
                <p>&copy; {new Date().getFullYear()} LocalChefBazaar. All rights reserved.</p>
                <p className="mt-1">Built with passion for home-cooked food.</p>
            </div>
        </footer>
    );
};

export default Footer;