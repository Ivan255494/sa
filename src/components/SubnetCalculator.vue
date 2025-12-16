<template>
  <div class="subnet-calculator">
    <h2>Калькулятор подсетей</h2>

    <div class="input-group">
      <label for="ip">IP-адрес:</label>
      <input
        id="ip"
        v-model="ipInput"
        type="text"
        placeholder="192.168.1.150"
        @keyup.enter="calculate"
        :class="{ invalid: !isValid && ipInput }"
      />
    </div>

    <div class="input-group">
      <label for="mask">Маска подсети:</label>
      <select id="mask" v-model="selectedMask">
        <option v-for="opt in maskOptions" :key="opt.mask" :value="opt.mask">
          {{ opt.label }}
        </option>
      </select>
    </div>

    <button
      class="calculate-btn"
      :disabled="!isValid"
      @click="calculate"
    >
      Рассчитать
    </button>

    <div v-if="result" class="result-box">
      <p><span>Текущий IP адрес:</span> {{ result.ip }}</p>
      <p><span>Текущая маска:</span> {{ result.mask }}</p>
      <p><span>Адрес сети:</span> {{ result.network }}</p>
      <p><span>Количество возможных адресов:</span> {{ result.addressesCount }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { maskOptions } from '../constants/maskOptions';
import { isIpValid } from '../utils/ipValidation';
import { getNetworkAddress } from '../utils/networkAddress';
import { getAddressesCount } from '../utils/addressesCount';

const ipInput = ref('');
const selectedMask = ref(maskOptions[24].mask); 
const isValid = computed(() => isIpValid(ipInput.value));
const result = ref<null | {
  ip: string;
  mask: string;
  network: string;
  addressesCount: number;
}>(null);

function calculate() {
  if (!isValid.value) return;
  result.value = {
    ip: ipInput.value,
    mask: selectedMask.value,
    network: getNetworkAddress(ipInput.value, selectedMask.value),
    addressesCount: getAddressesCount(selectedMask.value),
  };
}
</script>

<style scoped>
.subnet-calculator {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: var(--color-white);
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 108, 187, 0.1);
  font-family: 'base', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.subnet-calculator h2 {
  text-align: center;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-weight: 700;
  color: var(--color-black);
}

input,
select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--color-gray);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus,
select:focus {
  outline: none;
  border-color: var(--color-primary);
}

input.invalid {
  border-color: var(--color-error);
}

.calculate-btn {
  padding: 0.75rem;
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  transition: background 0.3s;
  margin-top: 1rem;
}

.calculate-btn:hover {
  background: #005a99;
}

.calculate-btn:disabled {
  background: var(--color-gray);
  cursor: not-allowed;
}

.result-box {
  margin-top: 1.5rem;
  padding: 1.2rem;
  background: var(--color-gray);
  border-radius: 12px;
  border-left: 4px solid var(--color-primary);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.result-box p {
  margin: 0;
  font-size: 1rem;
}

.result-box span {
  font-weight: 700;
  color: var(--color-primary);
}
</style>