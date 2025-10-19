'use client';

import { useState } from 'react';
import { SvelteCounter } from '@/components/SvelteCounter';
import { SvelteUserList } from '@/components/SvelteUserList';

export default function SvelteDemoPage() {
  const [reactCount, setReactCount] = useState(0);
  const [svelteCount, setSvelteCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [refreshCount, setRefreshCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">
            🎨 React + Svelte Integration Demo
          </h1>
          <p className="text-lg text-gray-300">
            Demonstrating Svelte components with TanStack Query embedded in React using Web Components
          </p>
        </div>

        {/* Data Fetching Component - Full Width */}
        <div className="mb-8 rounded-lg bg-white/10 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            🔥 Svelte + TanStack Query Component
          </h2>
          <SvelteUserList
            onDataLoaded={(data) => {
              setUserCount(data.count);
              console.log('Data loaded:', data);
            }}
            onUserSelect={(user) => {
              setSelectedUser(user);
              console.log('User selected:', user);
            }}
            onRefresh={() => {
              setRefreshCount(prev => prev + 1);
              console.log('Data refreshed');
            }}
          />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* React Component */}
          <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              ⚛️ React Component
            </h2>
            <div className="rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 p-6 text-center text-white">
              <p className="mb-2 text-sm font-semibold opacity-90">
                Native React Counter
              </p>
              <div className="my-6 text-5xl font-bold">
                {reactCount}
              </div>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setReactCount(reactCount - 1)}
                  className="rounded bg-white px-6 py-2 font-semibold text-blue-600 transition hover:scale-105"
                >
                  -
                </button>
                <button
                  onClick={() => setReactCount(0)}
                  className="rounded border border-white bg-white/20 px-6 py-2 font-semibold text-white transition hover:bg-white/30"
                >
                  Reset
                </button>
                <button
                  onClick={() => setReactCount(reactCount + 1)}
                  className="rounded bg-white px-6 py-2 font-semibold text-blue-600 transition hover:scale-105"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Svelte Component */}
          <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              🔥 Svelte Counter Component
            </h2>
            <SvelteCounter
              initialCount={10}
              onCountChange={(count) => {
                setSvelteCount(count);
                console.log('Svelte counter changed to:', count);
              }}
            />
          </div>
        </div>

        {/* Communication Panel */}
        <div className="mt-8 rounded-lg bg-white/10 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            📡 Component Communication & State
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-blue-500/20 p-4">
              <p className="text-sm font-semibold text-blue-200">React Counter</p>
              <p className="text-3xl font-bold text-white">{reactCount}</p>
            </div>
            <div className="rounded-lg bg-purple-500/20 p-4">
              <p className="text-sm font-semibold text-purple-200">Svelte Counter</p>
              <p className="text-3xl font-bold text-white">{svelteCount}</p>
            </div>
            <div className="rounded-lg bg-pink-500/20 p-4">
              <p className="text-sm font-semibold text-pink-200">Users Loaded</p>
              <p className="text-3xl font-bold text-white">{userCount}</p>
            </div>
            <div className="rounded-lg bg-orange-500/20 p-4">
              <p className="text-sm font-semibold text-orange-200">Refresh Count</p>
              <p className="text-3xl font-bold text-white">{refreshCount}</p>
            </div>
          </div>

          {selectedUser && (
            <div className="mt-4 rounded-lg bg-green-500/20 p-4">
              <p className="text-sm font-semibold text-green-200">Selected User</p>
              <p className="text-xl font-bold text-white">{selectedUser.name}</p>
              <p className="text-sm text-green-100">{selectedUser.email}</p>
            </div>
          )}
        </div>

        {/* Documentation */}
        <div className="mt-8 rounded-lg bg-white/10 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            📚 How It Works
          </h2>
          <div className="space-y-3 text-gray-300">
            <div className="rounded-lg bg-black/20 p-4">
              <p className="mb-2 font-semibold text-white">1. Svelte Compilation</p>
              <p className="text-sm">
                Svelte components are compiled as Web Components using the
                {' '}
                <code className="rounded bg-purple-500/30 px-2 py-1 text-purple-200">
                  customElement
                </code>
                {' '}
                option in Vite config.
              </p>
            </div>
            <div className="rounded-lg bg-black/20 p-4">
              <p className="mb-2 font-semibold text-white">2. TanStack Query Integration</p>
              <p className="text-sm">
                The UserList component uses
                {' '}
                <code className="rounded bg-purple-500/30 px-2 py-1 text-purple-200">
                  @tanstack/svelte-query
                </code>
                {' '}
                for efficient data fetching, caching, and state management—all running inside the web component.
              </p>
            </div>
            <div className="rounded-lg bg-black/20 p-4">
              <p className="mb-2 font-semibold text-white">3. React Integration</p>
              <p className="text-sm">
                React wraps the custom element with proper TypeScript types and event handling,
                making it feel like a native React component.
              </p>
            </div>
            <div className="rounded-lg bg-black/20 p-4">
              <p className="mb-2 font-semibold text-white">4. Event Communication</p>
              <p className="text-sm">
                Svelte dispatches custom events (dataloaded, userselect, refresh) that React listens to via event listeners,
                enabling bi-directional communication between frameworks.
              </p>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {/* Counter Example */}
          <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              💻 Counter Usage
            </h2>
            <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs text-green-400">
              {`import { SvelteCounter } from '@/components/SvelteCounter';

<SvelteCounter
  initialCount={10}
  onCountChange={(count) => {
    console.log('New count:', count);
  }}
/>`}
            </pre>
          </div>

          {/* UserList Example */}
          <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              💻 Data Fetching Usage
            </h2>
            <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs text-green-400">
              {`import { SvelteUserList } from '@/components/SvelteUserList';

<SvelteUserList
  onDataLoaded={(data) => {
    console.log('Loaded:', data.count);
  }}
  onUserSelect={(user) => {
    console.log('Selected:', user);
  }}
/>`}
            </pre>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 rounded-lg bg-white/10 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            ✨ Key Features
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-4">
              <p className="mb-2 text-lg font-bold text-white">🚀 Fast</p>
              <p className="text-sm text-gray-300">
                Svelte compiles to vanilla JS with no virtual DOM overhead
              </p>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-4">
              <p className="mb-2 text-lg font-bold text-white">🔄 Smart Caching</p>
              <p className="text-sm text-gray-300">
                TanStack Query handles caching, refetching, and stale data automatically
              </p>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-pink-500/20 to-pink-600/20 p-4">
              <p className="mb-2 text-lg font-bold text-white">🎯 Type Safe</p>
              <p className="text-sm text-gray-300">
                Full TypeScript support across both frameworks
              </p>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/20 p-4">
              <p className="mb-2 text-lg font-bold text-white">📦 Encapsulated</p>
              <p className="text-sm text-gray-300">
                Web Components provide style and logic encapsulation
              </p>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 p-4">
              <p className="mb-2 text-lg font-bold text-white">🔌 Framework Agnostic</p>
              <p className="text-sm text-gray-300">
                Works with React, Vue, Angular, or vanilla JS
              </p>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-red-500/20 to-red-600/20 p-4">
              <p className="mb-2 text-lg font-bold text-white">♿ Accessible</p>
              <p className="text-sm text-gray-300">
                Built with keyboard navigation and ARIA roles
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
