import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import FormItem from './FormItem';
import { createFormValidateConfig } from './formConfig';

const Step2 = ({ defaultValues, onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm(
    createFormValidateConfig({
      defaultValues: {
        email: '',
        phone: '',
        address: '',
        city: ''
      }
    })
  );

  // 当默认值改变时，更新表单
  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  // 处理表单提交
  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <div className="step-content">
      <h2>联系信息</h2>
      <form id="step-2-form" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="form-grid">
          <FormItem label="邮箱" required error={errors.email}>
            <input
              type="email"
              {...register('email', {
                required: '请输入邮箱',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '请输入有效的邮箱地址'
                }
              })}
              className={errors.email ? 'error' : ''}
            />
          </FormItem>

          <FormItem label="电话" required error={errors.phone}>
            <input
              type="tel"
              {...register('phone', {
                required: '请输入电话号码',
                pattern: {
                  value: /^1[3-9]\d{9}$/,
                  message: '请输入有效的手机号码'
                }
              })}
              className={errors.phone ? 'error' : ''}
            />
          </FormItem>

          <FormItem label="地址" required error={errors.address} fullWidth>
            <input
              type="text"
              {...register('address', {
                required: '请输入地址',
                minLength: {
                  value: 5,
                  message: '地址至少5个字符'
                }
              })}
              className={errors.address ? 'error' : ''}
            />
          </FormItem>

          <FormItem label="城市" required error={errors.city}>
            <input
              type="text"
              {...register('city', {
                required: '请输入城市',
                minLength: {
                  value: 2,
                  message: '城市名至少2个字符'
                }
              })}
              className={errors.city ? 'error' : ''}
            />
          </FormItem>
        </div>
      </form>
    </div>
  );
};

export default Step2;