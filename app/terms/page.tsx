import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-800 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        <p className="mb-4">
          Welcome to our website. By accessing or using our services, you agree to be bound by these terms and conditions.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Introduction</h2>
        <p className="mb-4">
          These terms govern your use of our website and services. If you do not agree with any part of these terms, you must not use our services.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">2. User Obligations</h2>
        <p className="mb-4">
          You agree to use our services only for lawful purposes and in a way that does not infringe the rights of others.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Limitation of Liability</h2>
        <p className="mb-4">
          We are not liable for any indirect, incidental, or consequential damages arising from your use of our services.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Changes to Terms</h2>
        <p className="mb-4">
          We may update these terms from time to time. We will notify you of any changes by posting the new terms on our website.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these terms, please contact us at support@example.com.
        </p>
        <p className="mt-8 text-sm text-gray-500">
          Last updated: 2024/08/21
        </p>
      </div>
    </div>
  );
};

export default TermsPage;