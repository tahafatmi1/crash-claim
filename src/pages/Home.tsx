import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Shield, Clock, FileText } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with CTA */}
      <section className="bg-gradient-to-b from-accent to-background py-16 xl:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl xl:text-6xl font-bold text-foreground mb-6">
              File Your Crash Claim with Confidence
            </h1>
            <p className="text-lg xl:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Get the compensation you deserve. Our streamlined process makes filing your crash claim simple, secure, and fast.
            </p>
            <Link to="/form">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Your Claim Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 xl:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl xl:text-4xl font-bold text-foreground mb-4">
              Why Choose Crash Claim?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We make the claims process easier and more efficient for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Fast Processing</CardTitle>
                <CardDescription>
                  Submit your claim in minutes and get a response within 24-48 hours
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>
                  Your information is protected with industry-leading security measures
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Simple Process</CardTitle>
                <CardDescription>
                  Easy-to-follow steps guide you through the entire claim submission
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Data Accuracy Section */}
      <section className="py-16 xl:py-20 bg-accent/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-8 h-8 text-primary" />
                  <CardTitle className="text-2xl">Why Accurate Data Matters</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Providing accurate information is crucial for processing your claim efficiently. Accurate data helps us:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Process your claim faster without delays for verification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Ensure you receive the correct compensation amount</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Avoid potential legal complications or claim rejections</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Maintain the integrity of the claims process for everyone</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Form Preview Section */}
      <section className="py-16 xl:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl xl:text-4xl font-bold text-foreground mb-4">
              What Information You'll Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here's a preview of the information we'll ask for in your claim
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Claim Form Preview</CardTitle>
                <CardDescription>
                  Prepare this information before starting your claim
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input placeholder="John Doe" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input placeholder="john@example.com" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input placeholder="(555) 123-4567" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Date of Incident</Label>
                    <Input type="date" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Accident Severity</Label>
                    <Input placeholder="Major / Moderate / Minor" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Medical Treatment</Label>
                    <Input placeholder="Today / This Week / This Month..." disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Was Accident Your Fault</Label>
                    <Input placeholder="Yes / No / Not Sure" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Accepted Settlement</Label>
                    <Input placeholder="Yes / No" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Working With Attorney</Label>
                    <Input placeholder="Yes / No" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Location (State)</Label>
                    <Input placeholder="Select your state" disabled />
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground text-center">
                    This is just a preview. Click the button below to start your actual claim.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="text-center mt-8">
              <Link to="/form">
                <Button size="lg" className="px-8">
                  Ready? Start Your Claim
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Links Section */}
      <section className="py-16 xl:py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl xl:text-3xl font-bold text-foreground mb-6">
              Your Privacy and Security Matter
            </h2>
            <p className="text-muted-foreground mb-8">
              We are committed to protecting your personal information and ensuring transparency in how we handle your data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/privacy-policy">
                <Button variant="outline" size="lg">
                  Privacy Policy
                </Button>
              </Link>
              <Link to="/terms-and-conditions">
                <Button variant="outline" size="lg">
                  Terms and Conditions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
