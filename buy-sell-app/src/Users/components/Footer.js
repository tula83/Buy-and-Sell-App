import "../CSS/footer.css"
function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h4>SHOPIFY</h4>
            <ul className="list-unstyled">
              
              <li>Welcome to Shopify</li>
              <li>you can buy and sell</li>
              <li>whatever you wish</li>
            </ul>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>USEFUL LINKS</h4>
            <ul className="list-unstyled">
              <li>
                <a href='/user-dashboard' className='text-reset'>
                  All Products
                </a>
              </li>
              <li>
                <a href='/cars' className='text-reset'>
                  Cars
                </a>
              </li>
              <li>
                <a href='/bikes' className='text-reset'>
                  Bikes
                </a>
              </li>
              <li>
              
                <a href='/mobiles' className='text-reset'>
                  Mobiles
                </a>
              
              </li>
            </ul>
          </div>
          {/* Column3 */}
          <div className="col">
            <h4>CONTACT</h4>
            <ul className="list-unstyled">
              <li>New York, NY 10012, US</li>
              <li>info@shopify.com</li>
              <li>+ 01 234 567 88</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} Shopify | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;