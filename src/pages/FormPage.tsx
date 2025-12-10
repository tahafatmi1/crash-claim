import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2, Shield } from 'lucide-react';

declare global {
  interface Window {
    xxTrustedForm?: {
      certUrl?: string;
    };
  }
}

const FormPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [trustedFormCertUrl, setTrustedFormCertUrl] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfIncident: '',
    incidentLocation: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    licensePlate: '',
    description: '',
    estimatedDamage: '',
    insuranceCompany: '',
    policyNumber: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load Trusted Form script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&ping_field=xxTrustedFormPingUrl&l=' + new Date().getTime() + Math.random();
    document.head.appendChild(script);

    // Check for cert URL periodically
    const interval = setInterval(() => {
      if (window.xxTrustedForm?.certUrl) {
        setTrustedFormCertUrl(window.xxTrustedForm.certUrl);
        clearInterval(interval);
      }
    }, 500);

    return () => {
      clearInterval(interval);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.dateOfIncident) {
      newErrors.dateOfIncident = 'Date of incident is required';
    } else {
      const incidentDate = new Date(formData.dateOfIncident);
      const today = new Date();
      if (incidentDate > today) {
        newErrors.dateOfIncident = 'Date cannot be in the future';
      }
    }

    if (!formData.incidentLocation.trim()) {
      newErrors.incidentLocation = 'Incident location is required';
    }

    if (!formData.vehicleMake.trim()) {
      newErrors.vehicleMake = 'Vehicle make is required';
    }

    if (!formData.vehicleModel.trim()) {
      newErrors.vehicleModel = 'Vehicle model is required';
    }

    if (!formData.vehicleYear.trim()) {
      newErrors.vehicleYear = 'Vehicle year is required';
    } else if (!/^\d{4}$/.test(formData.vehicleYear)) {
      newErrors.vehicleYear = 'Please enter a valid 4-digit year';
    } else {
      const year = parseInt(formData.vehicleYear);
      const currentYear = new Date().getFullYear();
      if (year < 1900 || year > currentYear + 1) {
        newErrors.vehicleYear = `Year must be between 1900 and ${currentYear + 1}`;
      }
    }

    if (!formData.licensePlate.trim()) {
      newErrors.licensePlate = 'License plate is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Incident description is required';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Please provide at least 20 characters';
    }

    if (formData.estimatedDamage && !/^\d+(\.\d{1,2})?$/.test(formData.estimatedDamage)) {
      newErrors.estimatedDamage = 'Please enter a valid amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please correct the errors in the form',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission with IP collection via Trusted Form
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real implementation, you would send the form data along with trustedFormCertUrl
      // to your backend API endpoint
      console.log('Form Data:', formData);
      console.log('Trusted Form Cert URL:', trustedFormCertUrl);

      setIsSuccess(true);
      toast({
        title: 'Claim Submitted Successfully!',
        description: 'We have received your claim and will contact you soon.',
      });

      // Redirect to home after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      toast({
        title: 'Submission Error',
        description: 'There was an error submitting your claim. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">Claim Submitted!</CardTitle>
            <CardDescription>
              Thank you for submitting your claim. We will review your information and contact you within 24-48 hours.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">
              Redirecting to home page...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl xl:text-4xl font-bold text-foreground mb-4">
            Submit Your Crash Claim
          </h1>
          <p className="text-lg text-muted-foreground">
            Please fill out all required fields accurately
          </p>
        </div>

        {/* IP Address Collection Notice */}
        <Card className="mb-6 border-primary/20 bg-accent/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Secure Form Verification</h3>
                <p className="text-sm text-muted-foreground">
                  For security and fraud prevention purposes, your IP address will be automatically collected when you submit this form. 
                  This information is used solely for verification and to ensure the authenticity of your claim submission. 
                  Your IP address is protected in accordance with our Privacy Policy.
                </p>
                {trustedFormCertUrl && (
                  <p className="text-xs text-primary mt-2 font-medium">
                    ✓ Trusted Form verification active
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Claim Information</CardTitle>
            <CardDescription>
              All fields marked with * are required
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Hidden field for Trusted Form */}
              <input type="hidden" name="xxTrustedFormCertUrl" value={trustedFormCertUrl} />

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={errors.fullName ? 'border-destructive' : ''}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-destructive">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                      className={errors.phone ? 'border-destructive' : ''}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfIncident">Date of Incident *</Label>
                    <Input
                      id="dateOfIncident"
                      name="dateOfIncident"
                      type="date"
                      value={formData.dateOfIncident}
                      onChange={handleChange}
                      className={errors.dateOfIncident ? 'border-destructive' : ''}
                    />
                    {errors.dateOfIncident && (
                      <p className="text-sm text-destructive">{errors.dateOfIncident}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Incident Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Incident Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="incidentLocation">Incident Location *</Label>
                  <Input
                    id="incidentLocation"
                    name="incidentLocation"
                    value={formData.incidentLocation}
                    onChange={handleChange}
                    placeholder="Street address, city, state, ZIP"
                    className={errors.incidentLocation ? 'border-destructive' : ''}
                  />
                  {errors.incidentLocation && (
                    <p className="text-sm text-destructive">{errors.incidentLocation}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Incident Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Please describe what happened in detail..."
                    rows={5}
                    className={errors.description ? 'border-destructive' : ''}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">{errors.description}</p>
                  )}
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Vehicle Information</h3>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleMake">Vehicle Make *</Label>
                    <Input
                      id="vehicleMake"
                      name="vehicleMake"
                      value={formData.vehicleMake}
                      onChange={handleChange}
                      placeholder="e.g., Toyota"
                      className={errors.vehicleMake ? 'border-destructive' : ''}
                    />
                    {errors.vehicleMake && (
                      <p className="text-sm text-destructive">{errors.vehicleMake}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehicleModel">Vehicle Model *</Label>
                    <Input
                      id="vehicleModel"
                      name="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={handleChange}
                      placeholder="e.g., Camry"
                      className={errors.vehicleModel ? 'border-destructive' : ''}
                    />
                    {errors.vehicleModel && (
                      <p className="text-sm text-destructive">{errors.vehicleModel}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehicleYear">Vehicle Year *</Label>
                    <Input
                      id="vehicleYear"
                      name="vehicleYear"
                      value={formData.vehicleYear}
                      onChange={handleChange}
                      placeholder="e.g., 2020"
                      className={errors.vehicleYear ? 'border-destructive' : ''}
                    />
                    {errors.vehicleYear && (
                      <p className="text-sm text-destructive">{errors.vehicleYear}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="licensePlate">License Plate *</Label>
                    <Input
                      id="licensePlate"
                      name="licensePlate"
                      value={formData.licensePlate}
                      onChange={handleChange}
                      placeholder="ABC-1234"
                      className={errors.licensePlate ? 'border-destructive' : ''}
                    />
                    {errors.licensePlate && (
                      <p className="text-sm text-destructive">{errors.licensePlate}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Insurance Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Insurance Information (Optional)</h3>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="insuranceCompany">Insurance Company</Label>
                    <Input
                      id="insuranceCompany"
                      name="insuranceCompany"
                      value={formData.insuranceCompany}
                      onChange={handleChange}
                      placeholder="e.g., State Farm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="policyNumber">Policy Number</Label>
                    <Input
                      id="policyNumber"
                      name="policyNumber"
                      value={formData.policyNumber}
                      onChange={handleChange}
                      placeholder="Policy number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedDamage">Estimated Damage ($)</Label>
                    <Input
                      id="estimatedDamage"
                      name="estimatedDamage"
                      value={formData.estimatedDamage}
                      onChange={handleChange}
                      placeholder="e.g., 5000"
                      className={errors.estimatedDamage ? 'border-destructive' : ''}
                    />
                    {errors.estimatedDamage && (
                      <p className="text-sm text-destructive">{errors.estimatedDamage}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Claim'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/')}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FormPage;
