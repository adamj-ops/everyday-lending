import type { Meta, StoryObj } from '@storybook/react';
import type { FormStep } from './multi-step-form';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiStepForm } from './multi-step-form';

const meta = {
  title: 'Forms/MultiStepForm',
  component: MultiStepForm,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    onComplete: fn(),
    onCancel: fn(),
    onStepChange: fn(),
  },
} satisfies Meta<typeof MultiStepForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// Simple 3-step example
const simpleSteps: FormStep[] = [
  {
    id: 'step1',
    title: 'Personal Information',
    description: 'Tell us about yourself',
    component: (
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="John Smith" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="john@example.com" />
        </div>
      </div>
    ),
  },
  {
    id: 'step2',
    title: 'Contact Details',
    description: 'How can we reach you?',
    component: (
      <div className="space-y-4">
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" placeholder="(555) 123-4567" />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input id="address" placeholder="123 Main St" />
        </div>
      </div>
    ),
  },
  {
    id: 'step3',
    title: 'Review',
    description: 'Confirm your information',
    component: (
      <div className="space-y-4">
        <div className="rounded-lg border border-neutral-200 p-4">
          <h3 className="mb-2 text-sm font-semibold text-neutral-700">
            Summary
          </h3>
          <p className="text-sm text-neutral-600">
            Please review your information before submitting.
          </p>
        </div>
      </div>
    ),
  },
];

export const Simple: Story = {
  args: {
    steps: simpleSteps,
  },
};

// With validation
const ValidationDemo = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const stepsWithValidation: FormStep[] = [
    {
      id: 'step1',
      title: 'Personal Information',
      description: 'All fields are required',
      component: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="John Smith"
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="john@example.com"
            />
          </div>
        </div>
      ),
      validate: () => {
        if (!name || !email) {
          alert('Please fill in all required fields');
          return false;
        }
        return true;
      },
    },
    {
      id: 'step2',
      title: 'Confirmation',
      component: (
        <div className="space-y-4">
          <div className="rounded-lg border border-neutral-200 p-4">
            <h3 className="mb-2 text-sm font-semibold text-neutral-700">
              Your Information
            </h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-neutral-500">Name:</dt>
                <dd className="font-medium text-neutral-800">{name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-500">Email:</dt>
                <dd className="text-neutral-800">{email}</dd>
              </div>
            </dl>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen">
      <MultiStepForm
        steps={stepsWithValidation}
        onComplete={() => alert('Form submitted!')}
      />
    </div>
  );
};

export const WithValidation: Story = {
  args: {
    steps: [],
    onComplete: fn(),
    allowSkip: true,
    showStepNumbers: true,
  },
  render: () => <ValidationDemo />,
};

// Five step wizard
const fiveSteps: FormStep[] = [
  {
    id: 'step1',
    title: 'Basic Info',
    component: (
      <div>
        <p className="text-neutral-600">Step 1 of 5</p>
      </div>
    ),
  },
  {
    id: 'step2',
    title: 'Details',
    component: (
      <div>
        <p className="text-neutral-600">Step 2 of 5</p>
      </div>
    ),
  },
  {
    id: 'step3',
    title: 'Preferences',
    component: (
      <div>
        <p className="text-neutral-600">Step 3 of 5</p>
      </div>
    ),
  },
  {
    id: 'step4',
    title: 'Additional',
    component: (
      <div>
        <p className="text-neutral-600">Step 4 of 5</p>
      </div>
    ),
  },
  {
    id: 'step5',
    title: 'Review',
    component: (
      <div>
        <p className="text-neutral-600">Step 5 of 5</p>
      </div>
    ),
  },
];

export const FiveSteps: Story = {
  args: {
    steps: fiveSteps,
  },
};

// Without step numbers
export const WithoutStepNumbers: Story = {
  args: {
    steps: simpleSteps,
    showStepNumbers: false,
  },
};

// With skip allowed
export const AllowSkip: Story = {
  args: {
    steps: simpleSteps,
    allowSkip: true,
  },
};

// With cancel button
export const WithCancel: Story = {
  args: {
    steps: simpleSteps,
    onCancel: fn(),
  },
};

// Long content
const longContentSteps: FormStep[] = [
  {
    id: 'step1',
    title: 'Long Form',
    description: 'Scrollable content',
    component: (
      <div className="space-y-6">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i}>
            <Label htmlFor={`field-${i}`}>
              Field
              {' '}
              {i + 1}
            </Label>
            <Input id={`field-${i}`} placeholder={`Enter value ${i + 1}`} />
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'step2',
    title: 'Review',
    component: (
      <div>
        <p className="text-neutral-600">Review your long form submission</p>
      </div>
    ),
  },
];

export const LongContent: Story = {
  args: {
    steps: longContentSteps,
  },
};

// Async validation
const AsyncValidationDemo = () => {
  const [username, setUsername] = useState('');

  const stepsWithAsyncValidation: FormStep[] = [
    {
      id: 'step1',
      title: 'Username',
      description: 'Choose a unique username',
      component: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="username">Username *</Label>
            <Input
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="johndoe"
            />
            <p className="mt-1 text-xs text-neutral-500">
              Will check availability (simulated 2s delay)
            </p>
          </div>
        </div>
      ),
      validate: async () => {
        if (!username) {
          alert('Please enter a username');
          return false;
        }

        // Simulate async validation (API call)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simulate validation result
        if (username.toLowerCase() === 'admin') {
          alert('Username "admin" is already taken');
          return false;
        }

        return true;
      },
    },
    {
      id: 'step2',
      title: 'Success',
      component: (
        <div className="space-y-4">
          <div className="bg-success-50 rounded-lg border border-success p-4">
            <h3 className="text-success-700 mb-2 text-sm font-semibold">
              Username Available
            </h3>
            <p className="text-success-600 text-sm">
              The username "
              {username}
              " is available!
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen">
      <MultiStepForm
        steps={stepsWithAsyncValidation}
        onComplete={() => alert('Registration complete!')}
      />
    </div>
  );
};

export const AsyncValidation: Story = {
  args: {
    steps: [],
    onComplete: fn(),
    allowSkip: true,
    showStepNumbers: true,
  },
  render: () => <AsyncValidationDemo />,
};
