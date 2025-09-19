import { useState } from 'react';
import StepIndicator from './StepIndicator';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import './StepForm.css';

const StepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepData, setStepData] = useState({
    step1: {},
    step2: {},
    step3: {}
  });

  const totalSteps = 3;

  // 处理步骤数据保存
  const handleStepDataSave = (step, data) => {
    setStepData(prev => ({
      ...prev,
      [`step${step}`]: data
    }));
  };

  // 下一步
  const nextStep = (stepData) => {
    // 保存当前步骤数据
    handleStepDataSave(currentStep, stepData);
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  // 上一步
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 提交表单
  const handleFinalSubmit = (stepData) => {
    // 保存最后一步数据
    handleStepDataSave(currentStep, stepData);
    
    const allData = {
      ...stepData.step1,
      ...stepData.step2,
      ...stepData
    };
    console.log('表单提交数据:', allData);
    alert('表单提交成功！请查看控制台输出。');
  };

  // 步骤配置
  const stepConfigs = [
    {
      id: 1,
      component: Step1,
      onSubmit: nextStep
    },
    {
      id: 2,
      component: Step2,
      onSubmit: nextStep
    },
    {
      id: 3,
      component: Step3,
      onSubmit: handleFinalSubmit
    }
  ];

  // 渲染当前步骤组件
  const renderStep = () => {
    const config = stepConfigs.find(step => step.id === currentStep);
    if (!config) return null;
    
    const { component: Component, onSubmit } = config;
    
    return (
      <Component
        defaultValues={stepData[`step${currentStep}`]}
        allStepsData={stepData}
        onSubmit={onSubmit}
      />
    );
  };

  return (
    <div className="step-form">
      <div className="step-form-container">
        <h1 className="step-form-title">多步骤表单</h1>
        
        <StepIndicator 
          currentStep={currentStep}
        />

        <div className="step-form-content">
          {renderStep()}
          
          <div className="step-form-actions">
            {currentStep > 1 && (
              <button 
                type="button" 
                onClick={prevStep}
                className="btn btn-secondary"
              >
                上一步
              </button>
            )}
            
            {currentStep < totalSteps ? (
              <button 
                type="submit"
                form={`step-${currentStep}-form`}
                className="btn btn-primary"
              >
                下一步
              </button>
            ) : (
              <button 
                type="submit"
                form={`step-${currentStep}-form`}
                className="btn btn-success"
              >
                提交
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepForm;