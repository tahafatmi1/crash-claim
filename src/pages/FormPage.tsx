import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2, Shield } from 'lucide-react';

declare global {
  interface Window {
    xxTrustedForm?: {
      certUrl?: string;
    };
  }
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  dateOfIncident: string;
  accidentSeverity: string;
  lastMedicalTreatment: string;
  wasYourFault: string;
  acceptedSettlement: string;
  workingWithAttorney: string;
  location: string;
}

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 
  'Wisconsin', 'Wyoming'
];

const FormPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [trustedFormCertUrl, setTrustedFormCertUrl] = useState('');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    dateOfIncident: '',
    accidentSeverity: '',
    lastMedicalTreatment: '',
    wasYourFault: '',
    acceptedSettlement: '',
    workingWithAttorney: '',
    location: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    // Load Trusted Form script
    const script = document.createElement('script');
    script.src = 'https://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&ping_field=xxTrustedFormPingUrl&l=' + new Date().getTime() + Math.random();
    script.async = true;
    document.head.appendChild(script);

    // Check for cert URL
    const interval = setInterval(() => {
      if (window.xxTrustedForm?.certUrl) {
        setTrustedFormCertUrl(window.xxTrustedForm.certUrl);
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\(\)\+]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Date of Incident validation
    if (!formData.dateOfIncident) {
      newErrors.dateOfIncident = 'Date of incident is required';
    } else {
      const incidentDate = new Date(formData.dateOfIncident);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (incidentDate > today) {
        newErrors.dateOfIncident = 'Date cannot be in the future';
      }
    }

    // Accident Severity validation
    if (!formData.accidentSeverity) {
      newErrors.accidentSeverity = 'Please select accident severity';
    }

    // Last Medical Treatment validation
    if (!formData.lastMedicalTreatment) {
      newErrors.lastMedicalTreatment = 'Please select when you last received treatment';
    }

    // Was Your Fault validation
    if (!formData.wasYourFault) {
      newErrors.wasYourFault = 'Please indicate if the accident was your fault';
    }

    // Accepted Settlement validation
    if (!formData.acceptedSettlement) {
      newErrors.acceptedSettlement = 'Please indicate if you accepted a settlement';
    }

    // Working With Attorney validation
    if (!formData.workingWithAttorney) {
      newErrors.workingWithAttorney = 'Please indicate if you are working with an attorney';
    }

    // Location validation
    if (!formData.location) {
      newErrors.location = 'Please select your location';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields correctly.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Form submitted:', {
        ...formData,
        trustedFormCertUrl,
      });

      setIsSuccess(true);
      toast({
        title: 'Success!',
        description: 'Your claim has been submitted successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit claim. Please try again.',
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
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle2 className="w-16 h-16 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Claim Submitted!</h2>
              <p className="text-muted-foreground">
                Thank you for submitting your crash claim. We have received your information and will review it shortly.
              </p>
              <p className="text-sm text-muted-foreground">
                You will receive a confirmation email at <strong>{formData.email}</strong>
              </p>
              <Button onClick={() => navigate('/')} className="w-full">
                Return to Home
              </Button>
            </div>
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
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={errors.fullName ? 'border-destructive' : ''}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-destructive">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? 'border-destructive' : ''}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone}</p>
                    )}
                  </div>

                  {/* Date of Incident */}
                  <div className="space-y-2">
                    <Label htmlFor="dateOfIncident">Date of Incident *</Label>
                    <Input
                      id="dateOfIncident"
                      name="dateOfIncident"
                      type="date"
                      value={formData.dateOfIncident}
                      onChange={handleInputChange}
                      max={new Date().toISOString().split('T')[0]}
                      className={errors.dateOfIncident ? 'border-destructive' : ''}
                    />
                    {errors.dateOfIncident && (
                      <p className="text-sm text-destructive">{errors.dateOfIncident}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Accident Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Accident Details</h3>
                
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {/* Accident Severity */}
                  <div className="space-y-2">
                    <Label htmlFor="accidentSeverity">Please select the severity of your accident *</Label>
                    <Select
                      value={formData.accidentSeverity}
                      onValueChange={(value) => handleSelectChange('accidentSeverity', value)}
                    >
                      <SelectTrigger className={errors.accidentSeverity ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="major">Major</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="minor">Minor</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.accidentSeverity && (
                      <p className="text-sm text-destructive">{errors.accidentSeverity}</p>
                    )}
                  </div>

                  {/* Last Medical Treatment */}
                  <div className="space-y-2">
                    <Label htmlFor="lastMedicalTreatment">When was the last time you received medical treatment *</Label>
                    <p className="text-xs text-muted-foreground">(Ambulance, Hospital, ER, Chiropractor, Doctor, etc)</p>
                    <Select
                      value={formData.lastMedicalTreatment}
                      onValueChange={(value) => handleSelectChange('lastMedicalTreatment', value)}
                    >
                      <SelectTrigger className={errors.lastMedicalTreatment ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="this_week">This Week</SelectItem>
                        <SelectItem value="this_month">This Month</SelectItem>
                        <SelectItem value="more_than_month">More than a Month Ago</SelectItem>
                        <SelectItem value="never">Never Received Treatment</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.lastMedicalTreatment && (
                      <p className="text-sm text-destructive">{errors.lastMedicalTreatment}</p>
                    )}
                  </div>

                  {/* Was Your Fault */}
                  <div className="space-y-2">
                    <Label htmlFor="wasYourFault">Was the accident your fault *</Label>
                    <Select
                      value={formData.wasYourFault}
                      onValueChange={(value) => handleSelectChange('wasYourFault', value)}
                    >
                      <SelectTrigger className={errors.wasYourFault ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select answer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="not_sure">Not Sure</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.wasYourFault && (
                      <p className="text-sm text-destructive">{errors.wasYourFault}</p>
                    )}
                  </div>

                  {/* Accepted Settlement */}
                  <div className="space-y-2">
                    <Label htmlFor="acceptedSettlement">Have you accepted a settlement for your accident *</Label>
                    <Select
                      value={formData.acceptedSettlement}
                      onValueChange={(value) => handleSelectChange('acceptedSettlement', value)}
                    >
                      <SelectTrigger className={errors.acceptedSettlement ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select answer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.acceptedSettlement && (
                      <p className="text-sm text-destructive">{errors.acceptedSettlement}</p>
                    )}
                  </div>

                  {/* Working With Attorney */}
                  <div className="space-y-2">
                    <Label htmlFor="workingWithAttorney">Are you currently working with an attorney *</Label>
                    <Select
                      value={formData.workingWithAttorney}
                      onValueChange={(value) => handleSelectChange('workingWithAttorney', value)}
                    >
                      <SelectTrigger className={errors.workingWithAttorney ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select answer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.workingWithAttorney && (
                      <p className="text-sm text-destructive">{errors.workingWithAttorney}</p>
                    )}
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Select
                      value={formData.location}
                      onValueChange={(value) => handleSelectChange('location', value)}
                    >
                      <SelectTrigger className={errors.location ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {US_STATES.map((state) => (
                          <SelectItem key={state} value={state.toLowerCase().replace(/\s+/g, '_')}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.location && (
                      <p className="text-sm text-destructive">{errors.location}</p>
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
