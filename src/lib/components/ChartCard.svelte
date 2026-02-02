<script lang="ts">
  import Chart from "chart.js/auto"
  import type { Event } from "$lib/types"

  interface Props {
    title: string;
    events: Event[];
    previousEvents: Event[];
    period: string;
    type?: 'count' | 'rate';
    denominatorEvents?: Event[];
    previousDenominatorEvents?: Event[];
  }

  let { title, events, previousEvents, period, type = 'count', denominatorEvents = [], previousDenominatorEvents = [] }: Props = $props();

  let canvas: HTMLCanvasElement | null = null;
  let chart: Chart | null = null;

  function getChartData(events: Event[], period: string, denominatorEvents: Event[] = []) {
    const now = new Date();
    const isRate = denominatorEvents.length > 0;
    if (period === 'oneDayAgo') {
      const hours = 24;
      const labels = [];
      const data = [];
      for (let i = hours - 1; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 60 * 60 * 1000);
        labels.push(date.getHours().toString().padStart(2, '0') + 'h');
        const start = new Date(date.getTime());
        const end = new Date(date.getTime() + 60 * 60 * 1000);
        const count = events.filter(e => {
          const d = new Date(e.created_at);
          return d >= start && d < end;
        }).length;
        let value = count;
        if (isRate) {
          const denomCount = denominatorEvents.filter(e => {
            const d = new Date(e.created_at);
            return d >= start && d < end;
          }).length;
          value = denomCount > 0 ? (count / denomCount) * 100 : 0;
        }
        data.push(value);
      }
      return { labels, data };
    } else if (period === 'oneYearAgo') {
      const months = 12;
      const labels = [];
      const data = [];
      for (let i = months - 1; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        labels.push(date.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' }));
        const start = new Date(date.getFullYear(), date.getMonth(), 1);
        const end = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        const count = events.filter(e => {
          const d = new Date(e.created_at);
          return d >= start && d < end;
        }).length;
        let value = count;
        if (isRate) {
          const denomCount = denominatorEvents.filter(e => {
            const d = new Date(e.created_at);
            return d >= start && d < end;
          }).length;
          value = denomCount > 0 ? (count / denomCount) * 100 : 0;
        }
        data.push(value);
      }
      return { labels, data };
    } else {
      let days: number;
      switch (period) {
        case 'sevenDaysAgo': days = 7; break;
        case 'thirtyDaysAgo': days = 30; break;
        default: days = 7;
      }
      const labels = [];
      const data = [];
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        labels.push(date.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' }));
        const count = events.filter(e => new Date(e.created_at).toDateString() === date.toDateString()).length;
        let value = count;
        if (isRate) {
          const denomCount = denominatorEvents.filter(e => new Date(e.created_at).toDateString() === date.toDateString()).length;
          value = denomCount > 0 ? (count / denomCount) * 100 : 0;
        }
        data.push(value);
      }
      return { labels, data };
    }
  }

  $effect(() => {
    if (!canvas) return;
    if (chart) {
      chart.destroy();
    }
    const chartData = getChartData(events, period, denominatorEvents);
    chart = new Chart(canvas, {
      type: "line",
      data: {
        labels: chartData.labels,
        datasets: [{
          label: title,
          data: chartData.data,
          borderColor: "#AA6373",
          backgroundColor: "oklch(87.9% 0.169 91.605)",
          tension: 0.6,
          fill: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  });

  const overallRate = $derived(type === 'rate' && denominatorEvents.length > 0 ? ((events.length / denominatorEvents.length) * 100) : events.length);
  const previousOverallRate = $derived(type === 'rate' && previousDenominatorEvents.length > 0 ? (previousEvents.length / previousDenominatorEvents.length) * 100 : previousEvents.length);
  let increase = $derived(overallRate - previousOverallRate);
</script>

<div class="bg-card p-4 rounded-xl h-[300px] flex flex-col gap-2">
  <h3 class="text-center text-xl">{title}</h3>
  {#if type === "rate"}
    <p class="text-xs text-gray mt-[-8px]">
      Le taux de conversion est le nombre 
      de fois où un produit est ajouté au panier par 
      rapport au nombre de vues
    </p>
  {/if}
  <!-- numeric datas (events, and evolution)-->
   <div class="flex justify-center items-center gap-8">
    <div class="text-center">
      <p class="text-sm text-gray-500">{type === 'rate' ? 'Taux' : 'Valeur'}</p>
      <p class="font-bold">{type === "rate" ? overallRate.toFixed(1) : overallRate}{type === 'rate' ? '%' : ''}</p>
    </div>
    <div class="text-center">
      <p class="text-sm text-gray-500">Evolution</p>
      <p class="font-bold {increase >= 0 ? 'text-green-400' : 'text-red-400'}">{increase >= 0 ? `+${Math.abs(increase).toFixed(type == 'rate' ? 1 : 0)}` : `-${Math.abs(increase).toFixed(type == 'rate' ? 1 : 0)}`}{type === 'rate' ? '%' : ''}</p>
    </div>
  </div>

  <div class="flex-1">
    <canvas bind:this={canvas} class="w-full h-full"></canvas>
  </div>

</div>