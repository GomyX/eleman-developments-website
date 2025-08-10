'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  CalculatorIcon,
  BanknotesIcon,
  CreditCardIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface PaymentCalculatorProps {
  propertyPrice: number;
  className?: string;
}

interface CalculationResult {
  downPayment: number;
  loanAmount: number;
  monthlyInstallment: number;
  totalAmount: number;
  totalInterest: number;
}

export default function PaymentCalculator({ propertyPrice, className = '' }: PaymentCalculatorProps) {
  const locale = useLocale();
  const t = useTranslations('property_details');
  const isRTL = locale === 'ar';

  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTermYears, setLoanTermYears] = useState(15);
  const [interestRate, setInterestRate] = useState(12);
  const [financingType, setFinancingType] = useState('bank');
  const [calculation, setCalculation] = useState<CalculationResult | null>(null);

  const calculatePayment = () => {
    const downPayment = (propertyPrice * downPaymentPercent) / 100;
    const loanAmount = propertyPrice - downPayment;
    
    if (loanAmount <= 0) {
      setCalculation({
        downPayment,
        loanAmount: 0,
        monthlyInstallment: 0,
        totalAmount: propertyPrice,
        totalInterest: 0
      });
      return;
    }

    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTermYears * 12;
    
    let monthlyInstallment: number;
    
    if (financingType === 'islamic') {
      // Islamic financing (Murabaha) - fixed profit margin
      const totalProfit = loanAmount * (interestRate / 100) * loanTermYears;
      monthlyInstallment = (loanAmount + totalProfit) / numPayments;
    } else {
      // Conventional loan calculation
      if (monthlyRate === 0) {
        monthlyInstallment = loanAmount / numPayments;
      } else {
        monthlyInstallment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                            (Math.pow(1 + monthlyRate, numPayments) - 1);
      }
    }

    const totalAmount = downPayment + (monthlyInstallment * numPayments);
    const totalInterest = totalAmount - propertyPrice;

    setCalculation({
      downPayment,
      loanAmount,
      monthlyInstallment,
      totalAmount,
      totalInterest
    });
  };

  useEffect(() => {
    calculatePayment();
  }, [downPaymentPercent, loanTermYears, interestRate, financingType, propertyPrice]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const financingOptions = [
    { 
      key: 'bank', 
      label: t('bank_financing'),
      icon: BanknotesIcon,
      rates: { min: 10, max: 15, default: 12 }
    },
    { 
      key: 'islamic', 
      label: t('islamic_financing'),
      icon: DocumentTextIcon,
      rates: { min: 8, max: 12, default: 10 }
    },
    { 
      key: 'developer', 
      label: t('developer_financing'),
      icon: CreditCardIcon,
      rates: { min: 5, max: 8, default: 6 }
    }
  ];

  const currentOption = financingOptions.find(opt => opt.key === financingType);

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
            {t('payment_calculator')}
          </h3>
          <p className="text-sm text-gray-600">
            {formatCurrency(propertyPrice)}
          </p>
        </div>
      </div>

      {/* Financing Type Selection */}
      <div className="mb-6">
        <label className={`block text-sm font-semibold text-gray-700 mb-3 ${
          isRTL ? 'text-right' : 'text-left'
        }`}>
          {t('financing_options')}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {financingOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <button
                key={option.key}
                onClick={() => {
                  setFinancingType(option.key);
                  setInterestRate(option.rates.default);
                }}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  financingType === option.key
                    ? 'border-saffron bg-saffron/5 text-saffron'
                    : 'border-gray-200 hover:border-saffron/50 text-gray-700'
                }`}
              >
                <IconComponent className="w-6 h-6 mx-auto mb-2" />
                <div className={`text-sm font-medium ${isRTL ? 'font-arabic' : 'font-latin'}`}>
                  {option.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Calculator Inputs */}
      <div className="space-y-6">
        {/* Down Payment */}
        <div>
          <div className={`flex justify-between items-center mb-2 ${
            isRTL ? 'flex-row-reverse' : 'flex-row'
          }`}>
            <label className="text-sm font-semibold text-gray-700">
              {t('down_payment')}
            </label>
            <span className="text-sm text-saffron font-bold">
              {downPaymentPercent}% - {formatCurrency((propertyPrice * downPaymentPercent) / 100)}
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="50"
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className={`flex justify-between text-xs text-gray-500 mt-1 ${
            isRTL ? 'flex-row-reverse' : 'flex-row'
          }`}>
            <span>10%</span>
            <span>50%</span>
          </div>
        </div>

        {/* Loan Term */}
        <div>
          <div className={`flex justify-between items-center mb-2 ${
            isRTL ? 'flex-row-reverse' : 'flex-row'
          }`}>
            <label className="text-sm font-semibold text-gray-700">
              {t('years')}
            </label>
            <span className="text-sm text-saffron font-bold">
              {loanTermYears} {t('years')}
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="30"
            value={loanTermYears}
            onChange={(e) => setLoanTermYears(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className={`flex justify-between text-xs text-gray-500 mt-1 ${
            isRTL ? 'flex-row-reverse' : 'flex-row'
          }`}>
            <span>5 {locale === 'ar' ? 'سنوات' : 'years'}</span>
            <span>30 {locale === 'ar' ? 'سنة' : 'years'}</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <div className={`flex justify-between items-center mb-2 ${
            isRTL ? 'flex-row-reverse' : 'flex-row'
          }`}>
            <label className="text-sm font-semibold text-gray-700">
              {t('interest_rate')}
            </label>
            <span className="text-sm text-saffron font-bold">
              {interestRate}%
            </span>
          </div>
          <input
            type="range"
            min={currentOption?.rates.min || 5}
            max={currentOption?.rates.max || 20}
            step="0.5"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className={`flex justify-between text-xs text-gray-500 mt-1 ${
            isRTL ? 'flex-row-reverse' : 'flex-row'
          }`}>
            <span>{currentOption?.rates.min}%</span>
            <span>{currentOption?.rates.max}%</span>
          </div>
        </div>
      </div>

      {/* Calculation Results */}
      {calculation && (
        <div className="mt-8 p-6 bg-gradient-to-r from-saffron/5 to-teal/5 rounded-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Monthly Installment */}
            <div className={`text-center p-4 bg-white rounded-lg shadow-sm ${
              isRTL ? 'font-arabic' : 'font-latin'
            }`}>
              <div className="text-2xl font-bold text-saffron mb-1">
                {formatCurrency(calculation.monthlyInstallment)}
              </div>
              <div className="text-sm text-gray-600">
                {t('monthly_installment')}
              </div>
            </div>

            {/* Total Amount */}
            <div className={`text-center p-4 bg-white rounded-lg shadow-sm ${
              isRTL ? 'font-arabic' : 'font-latin'
            }`}>
              <div className="text-2xl font-bold text-teal mb-1">
                {formatCurrency(calculation.totalAmount)}
              </div>
              <div className="text-sm text-gray-600">
                {t('total_price')}
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="mt-4 space-y-2 text-sm">
            <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <span className="text-gray-600">{t('down_payment')}:</span>
              <span className="font-semibold">{formatCurrency(calculation.downPayment)}</span>
            </div>
            <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <span className="text-gray-600">{locale === 'ar' ? 'مبلغ القرض' : 'Loan Amount'}:</span>
              <span className="font-semibold">{formatCurrency(calculation.loanAmount)}</span>
            </div>
            <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <span className="text-gray-600">{locale === 'ar' ? 'إجمالي الفوائد' : 'Total Interest'}:</span>
              <span className="font-semibold text-red-600">{formatCurrency(calculation.totalInterest)}</span>
            </div>
          </div>

          {/* Cash Discount Note */}
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className={`text-sm text-green-800 ${isRTL ? 'text-right' : 'text-left'}`}>
              <strong>{t('cash_discount')}:</strong> {locale === 'ar' ? 'خصم 5% للدفع كاش' : '5% discount for cash payment'}
            </div>
          </div>
        </div>
      )}

      {/* Calculate Button */}
      <button
        onClick={calculatePayment}
        className="w-full mt-6 bg-saffron text-white py-3 px-6 rounded-lg font-bold hover:bg-saffron/90 transition-colors duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse"
      >
        <CalculatorIcon className="w-5 h-5" />
        <span>{t('calculate')}</span>
      </button>
    </div>
  );
}

