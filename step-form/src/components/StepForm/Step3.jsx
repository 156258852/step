import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import FormItem from './FormItem';
import { createFormValidateConfig } from './formConfig';

const Step3 = ({ defaultValues, allStepsData, onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm(
    createFormValidateConfig({
      defaultValues: {
        occupation: '',
        interests: [],
        comments: ''
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
      <h2>确认信息</h2>
      
      {/* 显示之前填写的信息 */}
      <div className="confirmation-section">
        <h3>个人信息</h3>
        <div className="info-grid">
          <div className="info-item">
            <strong>姓名:</strong> {allStepsData.step1.firstName} {allStepsData.step1.lastName}
          </div>
          <div className="info-item">
            <strong>年龄:</strong> {allStepsData.step1.age}
          </div>
          <div className="info-item">
            <strong>性别:</strong> {
              allStepsData.step1.gender === 'male' ? '男' : 
              allStepsData.step1.gender === 'female' ? '女' : '其他'
            }
          </div>
        </div>
      </div>

      <div className="confirmation-section">
        <h3>联系信息</h3>
        <div className="info-grid">
          <div className="info-item">
            <strong>邮箱:</strong> {allStepsData.step2.email}
          </div>
          <div className="info-item">
            <strong>电话:</strong> {allStepsData.step2.phone}
          </div>
          <div className="info-item">
            <strong>地址:</strong> {allStepsData.step2.address}
          </div>
          <div className="info-item">
            <strong>城市:</strong> {allStepsData.step2.city}
          </div>
        </div>
      </div>

      {/* 补充信息 */}
      <form id="step-3-form" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="form-section">
          <h3>补充信息</h3>
          <div className="form-grid">
            <FormItem label="职业" required error={errors.occupation}>
              <input
                type="text"
                {...register('occupation', {
                  required: '请输入职业',
                  minLength: {
                    value: 2,
                    message: '职业至少2个字符'
                  }
                })}
                className={errors.occupation ? 'error' : ''}
              />
            </FormItem>

            <FormItem label="兴趣爱好">
              <div className="checkbox-group">
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    value="reading"
                    {...register('interests')}
                  />
                  阅读
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    value="sports"
                    {...register('interests')}
                  />
                  运动
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    value="music"
                    {...register('interests')}
                  />
                  音乐
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    value="travel"
                    {...register('interests')}
                  />
                  旅行
                </label>
              </div>
            </FormItem>

            <FormItem label="备注" fullWidth>
              <textarea
                rows="4"
                {...register('comments')}
                placeholder="请输入任何补充信息..."
              />
            </FormItem>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step3;