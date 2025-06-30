"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  Star, 
  Zap, 
  Users, 
  Building,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export function PricingSection() {
  const plans = [
    {
      name: "Free",
      description: "Perfect for individuals and small projects",
      price: "$0",
      period: "forever",
      icon: Star,
      badge: null,
      popular: false,
      features: [
        "Up to 3 database connections",
        "Basic schema visualization",
        "Export to PNG/SVG",
        "Community support",
        "1 team member"
      ],
      limitations: [
        "Limited to 10 tables per schema",
        "Basic export formats only"
      ],
      cta: "Get Started Free",
      ctaVariant: "outline" as const
    },
    {
      name: "Pro",
      description: "For growing teams and professional use",
      price: "$19",
      period: "per month",
      icon: Zap,
      badge: "Most Popular",
      popular: true,
      features: [
        "Unlimited database connections",
        "Advanced visualization features",
        "Export to PNG/SVG/JSON",
        "Real-time collaboration",
        "Up to 10 team members",
        "Version history",
        "Priority support",
        "Custom themes"
      ],
      limitations: [],
      cta: "Start Free Trial",
      ctaVariant: "default" as const
    },
    {
      name: "Enterprise",
      description: "For large organizations with advanced needs",
      price: "Custom",
      period: "contact us",
      icon: Building,
      badge: null,
      popular: false,
      features: [
        "Everything in Pro",
        "Unlimited team members",
        "SSO integration",
        "Advanced security features",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantee",
        "On-premise deployment"
      ],
      limitations: [],
      cta: "Contact Sales",
      ctaVariant: "outline" as const
    }
  ];

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, Pro plan comes with a 14-day free trial. No credit card required to start."
    },
    {
      question: "What databases are supported?",
      answer: "We support PostgreSQL, MySQL, and MongoDB with more databases coming soon."
    },
    {
      question: "Do you offer volume discounts?",
      answer: "Yes, we offer custom pricing for large teams and enterprises. Contact our sales team."
    }
  ];

  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4">
              <Star className="w-3 h-3 mr-1" />
              Simple Pricing
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Choose the right plan for{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                your team
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Start free and scale as you grow. All plans include our core visualization 
              features with advanced collaboration tools in paid tiers.
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`relative h-full ${
                plan.popular ? 'ring-2 ring-primary shadow-lg scale-105' : ''
              }`}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <plan.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                  <div className="mt-4">
                    <div className="text-3xl font-bold">{plan.price}</div>
                    <div className="text-sm text-muted-foreground">{plan.period}</div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-6">
                    {/* Features */}
                    <div>
                      <h4 className="font-medium mb-3">What's included:</h4>
                      <div className="space-y-2">
                        {plan.features.map((feature) => (
                          <div key={feature} className="flex items-start space-x-2">
                            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Limitations */}
                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-3 text-muted-foreground">Limitations:</h4>
                        <div className="space-y-2">
                          {plan.limitations.map((limitation) => (
                            <div key={limitation} className="text-sm text-muted-foreground">
                              • {limitation}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <Button 
                      className={`w-full ${plan.popular ? 'shadow-lg' : ''}`}
                      variant={plan.ctaVariant}
                      size="lg"
                    >
                      {plan.cta}
                      {plan.name !== "Enterprise" && (
                        <ArrowRight className="w-4 h-4 ml-2" />
                      )}
                    </Button>

                    {plan.name === "Pro" && (
                      <div className="text-center text-xs text-muted-foreground">
                        14-day free trial • No credit card required
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Frequently Asked Questions</h3>
            <p className="text-muted-foreground">
              Got questions? We've got answers. Can't find what you're looking for? 
              <Button variant="link" className="p-0 h-auto font-normal">
                Contact our support team
              </Button>
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={faq.question}>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold">{faq.question}</h4>
                    <p className="text-muted-foreground text-sm">{faq.answer}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="inline-block bg-gradient-to-r from-primary/10 to-primary/5">
            <CardContent className="p-8">
              <div className="space-y-4 max-w-md">
                <div>
                  <h3 className="text-xl font-semibold">Still have questions?</h3>
                  <p className="text-muted-foreground text-sm">
                    Our team is here to help you choose the right plan for your needs
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button>
                    Schedule a Demo
                  </Button>
                  <Button variant="outline">
                    Contact Sales
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}