import { ArrowLeft, RefreshCw, CreditCard, Clock, Gift, Heart, BookOpen } from 'lucide-react';

const RefundPolicy = () => {
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
            <RefreshCw className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Refund Policy</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our policy regarding refunds and cancellations for 100xDevs services
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">Last updated: January 2025</span>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Free Learning Platform</h3>
              <p className="text-gray-400">
                100xDevs is a <span className="text-green-400 font-medium">completely free platform</span> designed for educational purposes. 
                All courses, content, and features are provided at no cost to help students learn and grow their programming skills.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
          <div className="prose prose-invert max-w-none">
            
            {/* Overview Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Free Platform</h3>
                <p className="text-gray-400 text-sm">All courses and content provided at no cost</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Educational Focus</h3>
                <p className="text-gray-400 text-sm">Designed for learning and skill development</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Community Driven</h3>
                <p className="text-gray-400 text-sm">Built by developers, for developers</p>
              </div>
            </div>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                1. General Refund Policy
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Since 100xDevs is currently a free platform, no refunds are applicable for the core learning services. However, this policy outlines our approach for any future paid services or premium features.
              </p>
              <p className="text-gray-400 leading-relaxed">
                We are committed to providing high-quality educational content and excellent user experience. If you encounter any issues with our platform, please contact our support team.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <CreditCard className="w-6 h-6 text-blue-400 mr-3" />
                2. Future Paid Services
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                For any future paid services or premium features, the following refund policy will apply:
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3">Eligibility for Refunds</h3>
              <ul className="text-gray-400 space-y-2 ml-6 mb-4">
                <li>• Refund requests must be made within 30 days of purchase</li>
                <li>• Service must not have been used extensively (less than 20% completion)</li>
                <li>• Technical issues preventing service usage</li>
                <li>• Duplicate purchases or billing errors</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">Non-Refundable Items</h3>
              <ul className="text-gray-400 space-y-2 ml-6">
                <li>• Services used beyond 20% completion</li>
                <li>• Custom development or consulting services</li>
                <li>• Digital certificates or credentials</li>
                <li>• Services purchased more than 30 days ago</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Clock className="w-6 h-6 text-purple-400 mr-3" />
                3. Refund Process
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                If you are eligible for a refund, follow these steps:
              </p>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-white font-medium mb-2">Step 1: Contact Support</div>
                  <div className="text-gray-400 text-sm">Email us at suryanshunab@gmail.com with your refund request</div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-white font-medium mb-2">Step 2: Provide Information</div>
                  <div className="text-gray-400 text-sm">Include your account details and reason for refund</div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-white font-medium mb-2">Step 3: Review Process</div>
                  <div className="text-gray-400 text-sm">We will review your request within 5 business days</div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-white font-medium mb-2">Step 4: Refund Processing</div>
                  <div className="text-gray-400 text-sm">If approved, refunds will be processed within 10 business days</div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">4. Refund Methods</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Refunds will be processed using the same payment method used for the original purchase:
              </p>
              <ul className="text-gray-400 space-y-2 ml-6">
                <li>• Credit/Debit Card: Refunded to original card</li>
                <li>• PayPal: Refunded to PayPal account</li>
                <li>• Bank Transfer: Refunded to original account</li>
                <li>• Digital Wallets: Refunded to original wallet</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">5. Processing Times</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Review Time</h3>
                  <div className="text-blue-400 font-medium">5 Business Days</div>
                  <div className="text-gray-400 text-sm">Time to review your refund request</div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Processing Time</h3>
                  <div className="text-green-400 font-medium">10 Business Days</div>
                  <div className="text-gray-400 text-sm">Time to process approved refunds</div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">6. Dispute Resolution</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                If you are not satisfied with our refund decision, you may:
              </p>
              <ul className="text-gray-400 space-y-2 ml-6">
                <li>• Request a second review with additional documentation</li>
                <li>• Contact our customer service team for mediation</li>
                <li>• Escalate to our management team for final review</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">7. Chargeback Policy</h2>
              <p className="text-gray-400 leading-relaxed">
                If you initiate a chargeback with your bank or credit card company, we will cooperate with the investigation. However, please note that chargebacks may result in account suspension or termination. We encourage you to contact us directly first to resolve any issues.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">8. Policy Changes</h2>
              <p className="text-gray-400 leading-relaxed">
                We reserve the right to modify this refund policy at any time. Changes will be posted on this page with an updated "Last modified" date. Continued use of our services after changes constitutes acceptance of the new policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">9. Contact Information</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                For refund requests or questions about this policy, please contact us:
              </p>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-white font-medium mb-2">Refund Support</div>
                <div className="text-blue-400 font-medium">Email: suryanshunab@gmail.com</div>
                <div className="text-gray-400 text-sm mt-1">Subject: Refund Request - [Your Account Email]</div>
                <div className="text-gray-400 text-sm">Response time: Within 24 hours</div>
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
};

export default RefundPolicy;
