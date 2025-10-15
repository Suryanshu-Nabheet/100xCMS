import { ArrowLeft, FileText, Calendar, Users, Shield, AlertCircle, CheckCircle, Globe, Lock } from 'lucide-react';

const TermsConditions = () => {
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
            <FileText className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms & Conditions</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Terms of service and usage guidelines for the ClassX platform
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
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">User Agreement</h3>
                <p className="text-gray-400 text-sm">Terms governing platform usage and user responsibilities</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Content Rights</h3>
                <p className="text-gray-400 text-sm">Intellectual property and content usage policies</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Legal Framework</h3>
                <p className="text-gray-400 text-sm">Governing law and dispute resolution</p>
              </div>
            </div>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Users className="w-6 h-6 text-blue-400 mr-3" />
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                By accessing and using ClassX ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-gray-400 leading-relaxed">
                These Terms of Service ("Terms") govern your use of our online learning platform operated by Suryanshu Nabheet ("us", "we", or "our").
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Shield className="w-6 h-6 text-green-400 mr-3" />
                2. Use License
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Permission is granted to temporarily access ClassX for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="text-gray-400 space-y-2 ml-6">
                <li>• Modify or copy the materials</li>
                <li>• Use the materials for any commercial purpose or for any public display</li>
                <li>• Attempt to reverse engineer any software contained on the platform</li>
                <li>• Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <AlertCircle className="w-6 h-6 text-orange-400 mr-3" />
                3. User Accounts
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
              </p>
              <p className="text-gray-400 leading-relaxed">
                You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity, or a name that is otherwise offensive, vulgar, or obscene.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">4. Content and Intellectual Property</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                The content on ClassX, including but not limited to text, graphics, images, audio, video, and software, is the property of Suryanshu Nabheet or its content suppliers and is protected by copyright and other intellectual property laws.
              </p>
              <p className="text-gray-400 leading-relaxed">
                You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of our material without our prior written consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">5. Prohibited Uses</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                You may not use our platform:
              </p>
              <ul className="text-gray-400 space-y-2 ml-6">
                <li>• For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>• To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>• To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>• To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>• To submit false or misleading information</li>
                <li>• To upload or transmit viruses or any other type of malicious code</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">6. Privacy Policy</h2>
              <p className="text-gray-400 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the platform, to understand our practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">7. Disclaimer</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                The information on this platform is provided on an "as is" basis. To the fullest extent permitted by law, this Company:
              </p>
              <ul className="text-gray-400 space-y-2 ml-6">
                <li>• Excludes all representations and warranties relating to this platform and its contents</li>
                <li>• Excludes all liability for damages arising out of or in connection with your use of this platform</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-400 leading-relaxed">
                In no event shall Suryanshu Nabheet, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">9. Governing Law</h2>
              <p className="text-gray-400 leading-relaxed">
                These Terms shall be interpreted and governed by the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">10. Changes to Terms</h2>
              <p className="text-gray-400 leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">11. Contact Information</h2>
              <p className="text-gray-400 leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <div className="bg-white/5 rounded-lg p-4 mt-4">
                <div className="text-white font-medium">Email: suryanshunab@gmail.com</div>
                <div className="text-gray-400 text-sm">Response time: Within 48 hours</div>
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
};

export default TermsConditions;
