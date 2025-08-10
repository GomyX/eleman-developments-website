'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  CalculatorIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface ROICalculatorProps {
  className?: string;
}

interface CalculationResult {
  totalReturn: number;
  monthlyReturn: number;
  annualReturn: number;
  roi: number;
  profitAmount: number;
}

export default function ROICalculator({ className = '' }: ROICalculatorProps) {
  const locale = useLocale();
  const t = useTranslations('investment_page.calculator');
  const isRTL = locale === 'ar';

  const [investmentAmount, setInvestmentAmount] = useState(1000000);
  const [investmentPeriod, setInvestmentPeriod] = useState(3);
  const [propertyType, setPropertyType] = useState('residential');
  const [calculation, setCalculation] = useState<CalculationResult | null>(null);

  const propertyTypes = [
    { key: 'residential', roi: 13.5 },
    { key: 'commercial', roi: 16.5 },
    { key: 'land', roi: 22.5 }
  ];

  const calculateROI = () => {
    const selectedType = propertyTypes.find(type => type.key === propertyType);
    const annualROI = selectedType?.roi || 13.5;
    
    // Calculate compound return
    const totalReturn = investmentAmount * Math.pow(1 + (annualROI / 100), investmentPeriod);
    const profitAmount = totalReturn - investmentAmount;
    const monthlyReturn = profitAmount / (investmentPeriod * 12);
    const annualReturn = profitAmount / investmentPeriod;
    const roi = ((totalReturn - investmentAmount) / investmentAmount) * 100;

    setCalculation({
      totalReturn,
      monthlyReturn,
      annualReturn,
      roi,
      profitAmount
    });
  };

  useEffect(() => {
    calculateROI();
  }, [investmentAmount, investmentPeriod, propertyType]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(1)}%`;
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      {/* Header */}
      <div className={`flex items-center space-x-3 rtl:space-x-reverse mb-6 ${
        isRTL ? 'flex-row-reverse' : 'flex-row'
      }`}>
        <div className="p-3 bg-saffron/10 rounded-xl">
          <CalculatorIcon className="w-6 h-6 text-saffron" />
        </div>
        <div>
          <h3 className={`text-xl font-bold text-gray-900 ${
            isRTL ? 'font-arabic text-right' : 'font-latin text-left'
          }`}>
            {t('title')}
          </h3>
        </div>
      </div>

      {/* Calculator Inputs */}
      <div className="space-y-6">
        {/* Investment Amount */}
        <div>
          <label className={`block text-sm font-semibold text-gray-700 mb-2 ${
            isRTL ? 'text-right' : 'text-left'
          }`}>
            {t('investment_amount')}
          </label>
          <div className="relative">
            <CurrencyDollarIcon className={`absolute top-3 w-5 h-5 text-gray-400 ${
              isRTL ? 'right-3' : 'left-3'
            }`} />
            <input
              type="number"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              min="100000"
              step="50000"
              className={`w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-saffron focus:border-saffron ${
                isRTL ? 'text-right pr-4 pl-10' : 'text-left pl-10 pr-4'
              }`}
              placeholder="1,000,000"
            />
          </div>
          <div className="mt-2">
            <input
              type="range"
              min="100000"
              max="10000000"
              step="100000"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className={`flex justify-between text-xs text-gray-500 mt-1 ${
              isRTL ? 'flex-row-reverse' : 'flex-row'
            }`}>
              <span>100K</span>
              <span>10M</span>
            </div>
          </div>
        </div>

        {/* Investment Period */}
        <div>
          <label className={`block text-sm font-semibold text-gray-700 mb-2 ${
            isRTL ? 'text-right' : 'text-left'
          }`}>
            {t('investment_period')}
          </label>
          <div className="relative">
            <CalendarIcon className={`absolute top-3 w-5 h-5 text-gray-400 ${
              isRTL ? 'right-3' : 'left-3'
            }`} />
            <select
              value={investmentPeriod}
              onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
              className={`w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-saffron focus:border-saffron ${
                isRTL ? 'text-right pr-4 pl-10' : 'text-left pl-10 pr-4'
              }`}
            >
              <option value={1}>1 {t('years')}</option>
              <option value={2}>2 {t('years')}</option>
              <option value={3}>3 {t('years')}</option>
              <option value={5}>5 {t('years')}</option>
              <option value={7}>7 {t('years')}</option>
              <option value={10}>10 {t('years')}</option>
            </select>
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className={`block text-sm font-semibold text-gray-700 mb-3 ${
            isRTL ? 'text-right' : 'text-left'
          }`}>
            {t('property_type')}
          </label>
          <div className="grid grid-cols-3 gap-3">
            {propertyTypes.map((type) => (
              <button
                key={type.key}
                onClick={() => setPropertyType(type.key)}
                className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                  propertyType === type.key
                    ? 'border-saffron bg-saffron/5 text-saffron'
                    : 'border-gray-200 hover:border-saffron/50 text-gray-700'
                }`}
              >
                <ChartBarIcon className="w-6 h-6 mx-auto mb-2" />
                <div className={`text-sm font-medium ${isRTL ? 'font-arabic' : 'font-latin'}`}>
                  {t(type.key)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {formatPercentage(type.roi)}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calculation Results */}
      {calculation && (
        <div className="mt-8 p-6 bg-gradient-to-r from-saffron/5 to-teal/5 rounded-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Total Return */}
            <div className={`text-center p-4 bg-white rounded-lg shadow-sm ${
              isRTL ? 'font-arabic' : 'font-latin'
            }`}>
              <ArrowTrendingUpIcon className="w-8 h-8 text-saffron mx-auto mb-2" />
              <div className="text-2xl font-bold text-saffron mb-1">
                {formatCurrency(calculation.totalReturn)}
              </div>
              <div className="text-sm text-gray-600">
                {t('total_return')}
              </div>
            </div>

            {/* Monthly Return */}
            <div className={`text-center p-4 bg-white rounded-lg shadow-sm ${
              isRTL ? 'font-arabic' : 'font-latin'
            }`}>
              <CurrencyDollarIcon className="w-8 h-8 text-teal mx-auto mb-2" />
              <div className="text-2xl font-bold text-teal mb-1">
                {formatCurrency(calculation.monthlyReturn)}
              </div>
              <div className="text-sm text-gray-600">
                {t('monthly_return')}
              </div>
            </div>

            {/* ROI Percentage */}
            <div className={`text-center p-4 bg-white rounded-lg shadow-sm ${
              isRTL ? 'font-arabic' : 'font-latin'
            }`}>
              <ChartBarIcon className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-500 mb-1">
                {formatPercentage(calculation.roi)}
              </div>
              <div className="text-sm text-gray-600">
                {t('expected_roi')}
              </div>
            </div>

            {/* Profit Amount */}
            <div className={`text-center p-4 bg-white rounded-lg shadow-sm ${
              isRTL ? 'font-arabic' : 'font-latin'
            }`}>
              <ArrowTrendingUpIcon className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-500 mb-1">
                {formatCurrency(calculation.profitAmount)}
              </div>
              <div className="text-sm text-gray-600">
                {locale === 'ar' ? 'إجمالي الربح' : 'Total Profit'}
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="mt-6 space-y-3 text-sm">
            <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <span className="text-gray-600">
                {locale === 'ar' ? 'المبلغ المستثمر' : 'Initial Investment'}:
              </span>
              <span className="font-semibold">{formatCurrency(investmentAmount)}</span>
            </div>
            <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <span className="text-gray-600">
                {locale === 'ar' ? 'فترة الاستثمار' : 'Investment Period'}:
              </span>
              <span className="font-semibold">{investmentPeriod} {t('years')}</span>
            </div>
            <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <span className="text-gray-600">
                {locale === 'ar' ? 'العائد السنوي المتوقع' : 'Expected Annual Return'}:
              </span>
              <span className="font-semibold">{formatCurrency(calculation.annualReturn)}</span>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className={`text-xs text-yellow-800 ${isRTL ? 'text-right font-arabic' : 'text-left font-latin'}`}>
              <strong>
                {locale === 'ar' ? 'تنويه:' : 'Disclaimer:'}
              </strong>{' '}
              {locale === 'ar' 
                ? 'هذه الحسابات تقديرية وقد تختلف العوائد الفعلية حسب ظروف السوق'
                : 'These calculations are estimates and actual returns may vary based on market conditions'
              }
            </div>
          </div>
        </div>
      )}

      {/* Calculate Button */}
      <button
        onClick={calculateROI}
        className="w-full mt-6 bg-saffron text-white py-3 px-6 rounded-lg font-bold hover:bg-saffron/90 transition-colors duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse"
      >
        <CalculatorIcon className="w-5 h-5" />
        <span>{t('calculate')}</span>
      </button>
    </div>
  );
}
