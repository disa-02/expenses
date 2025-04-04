import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import './styles/LandingPage.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    useEffect(() => {
        AOS.init({
          duration: 1000, // Animation duration (1 second)
          once: false,    // Remove this option to allow animations to replay when scrolling up and down
        });
      }, []);
  return (
    <div className="landing-container">
      {/* Section 1: Image left, text right */}
      <div className="section" data-aos="fade-up">
        <img src="/images/admin.jpg" alt="Manage your expenses" className="landing-image" />
        <div className="landing-text">
          <h1>Easily Manage Your Expenses</h1>
          <p>
            Our app allows you to have full control over your finances. Record expenses, monitor income, and optimize your budget effortlessly!
          </p>
        </div>
      </div>

      {/* Section 2: Text left, image right */}
      <div className="section reverse" data-aos="fade-up">
        <div className="landing-text">
          <h1>Visualize Your Finances Clearly</h1>
          <p>
            Use interactive charts and detailed reports to analyze how your expenses and income change month by month. 
            Make smart decisions based on your financial habits.
          </p>
        </div>
        <img src="/images/charts.jpg" alt="Visualize your finances" className="landing-image" />
      </div>

      {/* Section 3: Image left, text right */}
      <div className="section" data-aos="fade-up">
        <img src="/images/report.jpg" alt="Automated reports" className="landing-image" />
        <div className="landing-text">
          <h1>Receive Automated Reports</h1>
          <p>
            Forget about manual calculations. Every week, you'll receive automated reports that help you understand where you can improve your finances.
          </p>
        </div>
      </div>

      {/* Section 4: Text left, image right */}
      <div className="section reverse" data-aos="fade-up">
        <div className="landing-text">
          <h1>Plan Your Financial Future</h1>
          <p>
            Our app helps you create a personalized financial plan based on your goals and spending habits, ensuring better long-term financial management.
          </p>
        </div>
        <img src="/images/future.jpg" alt="Plan your future" className="landing-image" />
      </div>

      {/* Section 5: Image left, text right */}
      <div className="section" data-aos="fade-up">
        <img src="/images/support.jpg" alt="24/7 Support" className="landing-image" />
        <div className="landing-text">
          <h1>24/7 Support</h1>
          <p>
            We're here to help anytime. We have a support team available 24/7 to solve any questions or issues you may have.
          </p>
        </div>
      </div>

      {/* Section 6: CTA - Call to Action */}
      <div className="cta-section" data-aos="fade-up">
        <h2>Ready to take control of your finances?</h2>
        <p>
          Join hundreds of people already using our app to improve their financial health.
        </p>
        <Link to="/signup">
          <button className="cta-button">Get Started Now</button>
        </Link>
        
      </div>
    </div>
  );
};

export default LandingPage;
