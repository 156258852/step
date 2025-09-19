import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import FormItem from './FormItem';
import { createFormValidateConfig } from './formConfig';

const Step1 = ({ defaultValues, onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm(
    createFormValidateConfig({
      defaultValues: {
        firstName: '',
        lastName: '',
        age: '',
        gender: ''
      }
    })
  );

  // 当默认值改变时，更新表单
  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  // 处理表单提交事件
  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  const handleFormError = (err) => {
    console.log('err', err);
  };

  return (
    <div className="step-content">
      <h2>个人信息</h2>
      <form id="step-1-form" onSubmit={handleSubmit(handleFormSubmit, handleFormError)}>
        <div className="form-grid">
          <FormItem label="姓名" required error={errors.firstName}>
            <input
              type="text"
              {...register('firstName', {
                required: '请输入姓名',
                minLength: { value: 2, message: '姓名至少2个字符' }
              })}
              className={errors.firstName ? 'error' : ''}
            />
          </FormItem>

          <FormItem label="姓氏" required error={errors.lastName}>
            <input
              type="text"
              {...register('lastName', {
                required: '请输入姓氏',
                minLength: { value: 1, message: '姓氏至少1个字符' }
              })}
              className={errors.lastName ? 'error' : ''}
            />
          </FormItem>

          <FormItem label="年龄" required error={errors.age}>
            <input
              type="number"
              {...register('age', {
                required: '请输入年龄',
                min: { value: 1, message: '年龄必须大于0' },
                max: { value: 120, message: '年龄不能超过120' }
              })}
              className={errors.age ? 'error' : ''}
            />
          </FormItem>

          <FormItem label="性别" required error={errors.gender}>
            <select
              {...register('gender', { required: '请选择性别' })}
              className={errors.gender ? 'error' : ''}
            >
              <option value="">请选择</option>
              <option value="male">男</option>
              <option value="female">女</option>
              <option value="other">其他</option>
            </select>
          </FormItem>
        </div>
      </form>
    </div>
  );
};

export default Step1;