<svelte:options customElement="svelte-user-list" />

<script lang="ts">
  import { QueryClient, QueryClientProvider, createQuery } from '@tanstack/svelte-query';
  import { createEventDispatcher } from 'svelte';
  
  // Props
  let { apiUrl = 'https://jsonplaceholder.typicode.com/users' } = $props<{ apiUrl?: string }>();
  
  // Create QueryClient for this component instance
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
      },
    },
  });
  
  const dispatch = createEventDispatcher();
  
  // Fetch users
  async function fetchUsers() {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    dispatch('dataloaded', { count: data.length, data });
    return data;
  }
  
  const usersQuery = createQuery(() => ({
    queryKey: ['users', apiUrl],
    queryFn: fetchUsers,
  }));
  
  function handleRefresh() {
    usersQuery.refetch();
    dispatch('refresh');
  }
  
  function handleUserClick(user: any) {
    dispatch('userselect', { user });
  }
</script>

<style>
  .container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    color: white;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .title {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
  }
  
  .refresh-btn {
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid white;
    border-radius: 6px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .refresh-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
  
  .refresh-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  .loading {
    text-align: center;
    padding: 40px;
    font-size: 18px;
  }
  
  .spinner {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 10px;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .error {
    background: rgba(239, 68, 68, 0.9);
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 12px;
  }
  
  .error-title {
    font-weight: 700;
    margin-bottom: 4px;
  }
  
  .user-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 400px;
    overflow-y: auto;
  }
  
  .user-card {
    background: rgba(255, 255, 255, 0.15);
    padding: 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    backdrop-filter: blur(10px);
  }
  
  .user-card:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateX(4px);
  }
  
  .user-name {
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 4px;
  }
  
  .user-email {
    font-size: 14px;
    opacity: 0.9;
    margin-bottom: 4px;
  }
  
  .user-company {
    font-size: 12px;
    opacity: 0.7;
  }
  
  .stats {
    margin-top: 16px;
    padding: 12px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
  
  .stat-label {
    opacity: 0.8;
  }
  
  .stat-value {
    font-weight: 700;
  }
</style>

<QueryClientProvider client={queryClient}>
  <div class="container">
    <div class="header">
      <h2 class="title">👥 User Directory</h2>
      <button 
        class="refresh-btn" 
        onclick={handleRefresh}
        disabled={$usersQuery.isFetching}
      >
        {$usersQuery.isFetching ? '↻ Loading...' : '↻ Refresh'}
      </button>
    </div>
    
    {#if $usersQuery.isLoading}
      <div class="loading">
        <div class="spinner"></div>
        <p>Loading users...</p>
      </div>
    {:else if $usersQuery.error}
      <div class="error">
        <div class="error-title">⚠️ Error Loading Users</div>
        <div>{$usersQuery.error.message}</div>
      </div>
      <button class="refresh-btn" onclick={handleRefresh}>
        Try Again
      </button>
    {:else if $usersQuery.data}
      <div class="user-list">
        {#each $usersQuery.data as user}
          <div 
            class="user-card" 
            role="button"
            tabindex="0"
            onclick={() => handleUserClick(user)}
            onkeydown={(e) => e.key === 'Enter' && handleUserClick(user)}
          >
            <div class="user-name">{user.name}</div>
            <div class="user-email">✉️ {user.email}</div>
            <div class="user-company">🏢 {user.company.name}</div>
          </div>
        {/each}
      </div>
      
      <div class="stats">
        <div>
          <span class="stat-label">Total Users:</span>
          <span class="stat-value">{$usersQuery.data.length}</span>
        </div>
        <div>
          <span class="stat-label">Status:</span>
          <span class="stat-value">{$usersQuery.isFetching ? 'Refreshing' : 'Fresh'}</span>
        </div>
      </div>
    {/if}
  </div>
</QueryClientProvider>

