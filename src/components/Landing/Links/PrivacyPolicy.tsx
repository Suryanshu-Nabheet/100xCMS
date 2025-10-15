import { ArrowLeft, Shield, Eye, Lock, Database, Users, Calendar, CheckCircle, Globe, AlertTriangle } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-purple-900/10"></div>
      
      {/* Back Button - Top Left */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 hover:border-white/30 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-2xl mb-6">
            <Shield className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            How we collect, use, and protect your personal information
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">Last updated: January 2025</span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
          <div className="prose prose-invert max-w-none">
            
            {/* Overview Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Data Collection</h3>
                <p className="text-gray-400 text-sm">What information we collect and why</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Data Protection</h3>
                <p className="text-gray-400 text-sm">How we secure and protect your information</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Your Rights</h3>
                <p className="text-gray-400 text-sm">Control over your personal data</p>
              </div>
            </div>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Eye className="w-6 h-6 text-blue-400 mr-3" />
                1. Information We Collect
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3">Personal Information</h3>
              <ul className="text-gray-400 space-y-2 ml-6 mb-4">
                <li>• Name and email address</li>
                <li>• Profile information and preferences</li>
                <li>• Learning progress and course data</li>
                <li>• Communication preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">Usage Information</h3>
              <ul className="text-gray-400 space-y-2 ml-6">
                <li>• Device information and browser type</li>
                <li>• IP address and location data</li>
                <li>• Pages visited and time spent on platform</li>
                <li>• Course interactions and progress</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Database className="w-6 h-6 text-green-400 mr-3" />
                2. How We Use Your Information
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We use the information we collect to provide, maintain, and improve our services:
              </p>
              <ul className="text-gray-400 space-y-2 ml-6">
                <li>• To provide and maintain our learning platform</li>
                <li>• To personalize your learning experience</li>
                <li>• To track your progress and achievements</li>
                <li>• To communicate with you about updates and new features</li>
                <li>• To provide customer support</li>
                <li>• To analyze usage patterns and improve our services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Lock className="w-6 h-6 text-purple-400 mr-3" />
                3. Information Sharing and Disclosure
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
              </p>
              <ul className="text-gray-400 space-y-2 ml-6">
                <li>• With your explicit consent</li>
                <li>• To comply with legal obligations</li>
                <li>• To protect our rights and prevent fraud</li>
                <li>• With service providers who assist in platform operations</li>
                <li>• In connection with a business transfer or acquisition</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction:
              </p>
              <ul className="text-gray-400 space-y-2 ml-6">
                <li>• Encryption of data in transit and at rest</li>
                <li>• Regular security audits and assessments</li>
                <li>• Access controls and authentication systems</li>
                <li>• Secure data centers and infrastructure</li>
                <li>• Employee training on data protection</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Retention</h2>
              <p className="text-gray-400 leading-relaxed">
                We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this privacy policy. We will delete or anonymize your information when it is no longer needed, unless we are required to retain it for legal or regulatory purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights and Choices</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                You have certain rights regarding your personal information:
              </p>
              <ul className="text-gray-400 space-y-2 ml-6">
                <li>• Access: Request access to your personal information</li>
                <li>• Correction: Request correction of inaccurate information</li>
                <li>• Deletion: Request deletion of your personal information</li>
                <li>• Portability: Request transfer of your data</li>
                <li>• Objection: Object to processing of your information</li>
                <li>• Withdrawal: Withdraw consent where applicable</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">7. Cookies and Tracking</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our platform:
              </p>
              <ul className="text-gray-400 space-y-2 ml-6">
                <li>• Essential cookies for platform functionality</li>
                <li>• Analytics cookies to understand usage patterns</li>
                <li>• Preference cookies to remember your settings</li>
                <li>• Marketing cookies for relevant content (with consent)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">8. Third-Party Services</h2>
              <p className="text-gray-400 leading-relaxed">
                Our platform may integrate with third-party services such as authentication providers (Clerk), analytics tools, and content delivery networks. These services have their own privacy policies, and we encourage you to review them.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">9. International Data Transfers</h2>
              <p className="text-gray-400 leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">10. Children's Privacy</h2>
              <p className="text-gray-400 leading-relaxed">
                Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">11. Changes to This Policy</h2>
              <p className="text-gray-400 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date. We encourage you to review this privacy policy periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">12. Contact Us</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                If you have any questions about this privacy policy or our data practices, please contact us:
              </p>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-white font-medium mb-2">Data Protection Officer</div>
                <div className="text-blue-400 font-medium">Email: suryanshunab@gmail.com</div>
                <div className="text-gray-400 text-sm mt-1">Response time: Within 48 hours</div>
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
