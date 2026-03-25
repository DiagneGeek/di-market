<script lang="ts">
	interface Props {
		class?: string;
	}

	let { class: _class = '' }: Props = $props();
</script>

<svg
	viewBox="0 0 300 200"
	class={`w-full max-w-sm mx-auto ${_class}`}
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Background -->
	<rect width="300" height="200" fill="none" />

	<!-- Road -->
	<rect y="140" width="300" height="60" fill="#E5E7EB" />

	<!-- Road lines -->
	<line x1="0" y1="170" x2="300" y2="170" stroke="white" stroke-width="2" stroke-dasharray="10,10" />

	<!-- Delivery person figure -->
	<g>
		<!-- Head -->
		<circle cx="60" cy="70" r="12" fill="#D4A574" />

		<!-- Body -->
		<rect x="52" y="85" width="16" height="25" rx="2" fill="#3B82F6" />

		<!-- Arms -->
		<rect x="35" y="90" width="17" height="8" rx="4" fill="#D4A574" />
		<rect x="68" y="90" width="17" height="8" rx="4" fill="#D4A574" />

		<!-- Legs -->
		<rect x="54" y="112" width="6" height="20" rx="3" fill="#1F2937" />
		<rect x="64" y="112" width="6" height="20" rx="3" fill="#1F2937" />

		<!-- Shoes -->
		<ellipse cx="57" cy="133" rx="4" ry="5" fill="#000" />
		<ellipse cx="67" cy="133" rx="4" ry="5" fill="#000" />
	</g>

	<!-- Package being delivered -->
	<g>
		<!-- Main package -->
		<rect x="140" y="90" width="50" height="50" rx="3" fill="#EF4444" opacity="0.9" />

		<!-- Package label -->
		<rect x="150" y="105" width="30" height="20" fill="white" opacity="0.8" />
		<line x1="155" y1="110" x2="175" y2="110" stroke="#EF4444" stroke-width="1" />
		<line x1="155" y1="115" x2="175" y2="115" stroke="#EF4444" stroke-width="1" />
		<line x1="155" y1="120" x2="170" y2="120" stroke="#EF4444" stroke-width="1" />

		<!-- Package highlight (3D effect) -->
		<rect x="140" y="90" width="50" height="5" fill="white" opacity="0.3" rx="1" />
	</g>

	<!-- House/destination -->
	<g>
		<!-- House body -->
		<rect x="220" y="100" width="60" height="50" fill="#FCD34D" />

		<!-- Roof -->
		<polygon points="220,100 250,70 280,100" fill="#DC2626" />

		<!-- Door -->
		<rect x="240" y="120" width="20" height="30" fill="#78350F" />

		<!-- Door handle -->
		<circle cx="258" cy="135" r="2" fill="#FFD700" />

		<!-- Chimney -->
		<rect x="260" y="75" width="8" height="25" fill="#9CA3AF" />

		<!-- Window -->
		<rect x="295" y="110" width="12" height="12" fill="#87CEEB" />
		<line x1="301" y1="110" x2="301" y2="122" stroke="#000" stroke-width="0.5" />
		<line x1="295" y1="116" x2="307" y2="116" stroke="#000" stroke-width="0.5" />
	</g>

	<!-- Delivery arrow/motion lines -->
	<g opacity="0.6">
		<path d="M 110 115 Q 160 100 200 110" stroke="#3B82F6" stroke-width="2" fill="none" stroke-linecap="round" />
		<polygon points="200,110 195,108 197,115" fill="#3B82F6" />
	</g>

	<!-- Checkmark for complete delivery -->
	<g opacity="0.8">
		<circle cx="270" cy="145" r="12" fill="#10B981" />
		<path d="M 265 145 L 268 148 L 275 140" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
	</g>

	<!-- Decorative circles (representing efficiency) -->
	<g opacity="0.2">
		<circle cx="50" cy="40" r="8" fill="#3B82F6" />
		<circle cx="250" cy="30" r="6" fill="#3B82F6" />
		<circle cx="150" cy="20" r="7" fill="#3B82F6" />
	</g>
</svg>
