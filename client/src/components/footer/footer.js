import React from 'react';
import { Link } from 'react-router-dom'


const Footer = () => {
    return (
        <footer class="page-footer font-small blue">
            <div class="footer-copyright text-center py-2">© 2021 Copyright :
                <Link to="/"> Staff management portal</Link>
            </div>
        </footer>
    );
}

export default Footer;