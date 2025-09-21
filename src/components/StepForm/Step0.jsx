import { useForm, Controller, useController } from 'react-hook-form';
import { useEffect } from 'react';

import FormItem from './FormItem';
import { createFormValidateConfig } from './formConfig';

// 自定义输入组件示例1: 简单文本输入
const MyInput = ({ value, onChange, onBlur, ...props }) => {
  return (
    <input
      {...props}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      style={{
        padding: '8px',
        border: '2px solid #007bff',
        borderRadius: '4px',
        fontSize: '14px'
      }}
    />
  );
};

// 自定义输入组件示例2: 带前缀的输入框
const PrefixInput = ({ value, onChange, onBlur, prefix, ...props }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px' }}>
      {prefix && (
        <span style={{ padding: '8px', backgroundColor: '#f5f5f5', borderRight: '1px solid #ccc' }}>
          {prefix}
        </span>
      )}
      <input
        {...props}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        style={{
          padding: '8px',
          border: 'none',
          outline: 'none',
          flex: 1
        }}
      />
    </div>
  );
};

// 自定义选择器组件
const CustomSelect = ({ value, onChange, onBlur, options, placeholder, ...props }) => {
  return (
    <select
      {...props}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      style={{
        padding: '8px',
        border: '2px solid #28a745',
        borderRadius: '4px',
        fontSize: '14px',
        backgroundColor: 'white'
      }}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

// 自定义标签输入组件
const TagInput = ({ value, onChange, onBlur, placeholder }) => {
  const tags = value || [];

  const addTag = (tagText) => {
    if (tagText.trim() && !tags.includes(tagText.trim())) {
      onChange([...tags, tagText.trim()]);
    }
  };

  const removeTag = (index) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(e.target.value);
      e.target.value = '';
    }
  };

  return (
    <div>
      <div style={{
        border: '2px solid #17a2b8',
        borderRadius: '4px',
        padding: '8px',
        minHeight: '40px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '4px'
      }}>
        {tags.map((tag, index) => (
          <span
            key={index}
            style={{
              backgroundColor: '#17a2b8',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                padding: '0',
                marginLeft: '4px'
              }}
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          placeholder={placeholder}
          onKeyPress={handleKeyPress}
          onBlur={onBlur}
          style={{
            border: 'none',
            outline: 'none',
            flex: 1,
            minWidth: '100px',
            padding: '4px'
          }}
        />
      </div>
    </div>
  );
};

// 使用 useController Hook 的自定义组件示例
const ControlledInputWithHook = ({ name, control, rules, placeholder, ...props }) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error }
  } = useController({
    name,
    control,
    rules
  });

  return (
    <div>
      <input
        {...props}
        ref={ref}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        style={{
          padding: '8px',
          border: error ? '2px solid #dc3545' : '2px solid #6f42c1',
          borderRadius: '4px',
          fontSize: '14px',
          width: '100%'
        }}
      />
      {error && (
        <span style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px', display: 'block' }}>
          {error.message}
        </span>
      )}
    </div>
  );
};

// 使用 useController 的计数器组件
const CounterInput = ({ name, control, rules }) => {
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control,
    rules
  });

  const { value, onChange } = field;

  const currentValue = value || 0;


  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        border: error ? '2px solid #dc3545' : '2px solid #fd7e14',
        borderRadius: '4px',
        padding: '8px'
      }}>
        <button
          type="button"
          onClick={() => {
            onChange(Math.max(0, currentValue - 1))
          }}
          style={{
            background: '#fd7e14',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '5px 10px',
            cursor: 'pointer'
          }}
        >
          -
        </button>
        <span style={{ minWidth: '40px', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }}>
          {currentValue}
        </span>
        <button
          type="button"
          onClick={() => onChange(currentValue + 1)}
          style={{
            background: '#fd7e14',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '5px 10px',
            cursor: 'pointer'
          }}
        >
          +
        </button>
      </div>
      {error && (
        <span style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px', display: 'block' }}>
          {error.message}
        </span>
      )}
    </div>
  );
};

const Step0 = ({ defaultValues, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    watch,
    control
  } = useForm(
    createFormValidateConfig({
      defaultValues: {
        // 使用 register 的简单输入
        simpleInput: '',
        // 使用 Controller 的自定义组件
        customInput: '',
        prefixedPhone: '',
        customGender: '',
        tags: [],
        // 使用 useController 的组件
        controlledInput: 'hello world!',
        counter: 0,
        ...defaultValues
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

  const handleFormError = () => {
    // 表单有错误时的处理
  };

  // 监听表单值变化（实时展示）
  const watchedValues = watch();

  return (
    <div className="step-content">
      <h2>自定义表单组件演示</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        这里演示了 React Hook Form 中使用自定义组件的各种方法
      </p>

      {/* 实时数据展示 */}
      <div style={{
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#e3f2fd',
        borderRadius: '4px',
        border: '1px solid #2196f3'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>📊 实时表单数据</h4>
        <pre style={{
          margin: 0,
          fontSize: '12px',
          backgroundColor: '#fff',
          padding: '10px',
          borderRadius: '4px',
          overflow: 'auto',
          maxHeight: '150px'
        }}>
          {JSON.stringify(watchedValues, null, 2)}
        </pre>
      </div>

      {/* 表单操作按钮 */}
      <div style={{
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <p style={{ margin: '0 0 15px 0', fontWeight: 'bold', fontSize: '16px', color: '#495057' }}>
          🛠️ 表单操作演示
        </p>

        {/* 第一行：基础操作 */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '15px'
        }}>
          <button
            type="button"
            onClick={() => setValue('customInput', '自定义值测试', { shouldValidate: true })}
            style={{
              padding: '10px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s',
              minWidth: '140px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            设置自定义输入值
          </button>

          <button
            type="button"
            onClick={() => setValue('prefixedPhone', '13888888888', { shouldValidate: true })}
            style={{
              padding: '10px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s',
              minWidth: '140px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1e7e34'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
          >
            设置电话号码
          </button>

          <button
            type="button"
            onClick={() => setValue('customGender', 'female', { shouldValidate: true })}
            style={{
              padding: '10px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s',
              minWidth: '140px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
          >
            设置性别为女性
          </button>

          <button
            type="button"
            onClick={() => setValue('tags', ['React', 'JavaScript', 'TypeScript'], { shouldValidate: true })}
            style={{
              padding: '10px 16px',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s',
              minWidth: '140px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#138496'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#17a2b8'}
          >
            设置标签
          </button>
        </div>

        {/* 第二行：useController 操作 */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '15px'
        }}>
          <button
            type="button"
            onClick={() => setValue('controlledInput', 'useController 测试值', { shouldValidate: true })}
            style={{
              padding: '10px 16px',
              backgroundColor: '#6f42c1',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s',
              minWidth: '160px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#59359a'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#6f42c1'}
          >
            设置 useController 输入
          </button>

          <button
            type="button"
            onClick={() => setValue('counter', 8, { shouldValidate: true })}
            style={{
              padding: '10px 16px',
              backgroundColor: '#fd7e14',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s',
              minWidth: '140px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#e8690b'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#fd7e14'}
          >
            设置计数器为8
          </button>

          <button
            type="button"
            onClick={() => {
              setValue('controlledInput', '批量更新的值', { shouldValidate: true });
              setValue('counter', 10, { shouldValidate: true });
            }}
            style={{
              padding: '10px 16px',
              backgroundColor: '#e83e8c',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s',
              minWidth: '180px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#d91a72'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#e83e8c'}
          >
            批量设置 useController
          </button>
        </div>

        {/* 第三行：工具按钮 */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          paddingTop: '10px',
          borderTop: '1px solid #dee2e6'
        }}>
          <button
            type="button"
            onClick={() => {
              const allValues = getValues();
              alert(`所有表单值已获取:\n\n${JSON.stringify(allValues, null, 2)}`);
            }}
            style={{
              padding: '10px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s',
              minWidth: '120px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#545b62'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
          >
            📋 获取所有值
          </button>

          <button
            type="button"
            onClick={() => {
              reset();
            }}
            style={{
              padding: '10px 16px',
              backgroundColor: '#ffc107',
              color: '#212529',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s',
              minWidth: '120px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#e0a800'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ffc107'}
          >
            🔄 重置表单
          </button>
        </div>
      </div>

      <form id="step-0-form" onSubmit={handleSubmit(handleFormSubmit, handleFormError)}>
        <div className="form-grid">

          {/* 方法1: 使用 register 的普通输入框 */}
          <FormItem label="普通输入 (register)" error={errors.simpleInput}>
            <input
              type="text"
              placeholder="使用 register 注册的普通输入框"
              {...register('simpleInput', {
                required: '请输入内容'
              })}
              style={{
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </FormItem>

          {/* 方法2: 使用 Controller 的自定义输入框 */}
          <FormItem label="自定义输入 (Controller)" required error={errors.customInput}>
            <Controller
              name="customInput"
              control={control}
              rules={{
                required: '请输入自定义内容',
                minLength: { value: 2, message: '至少2个字符' }
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <MyInput
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                  placeholder="这是自定义的输入组件"
                />
              )}
            />
          </FormItem>

          {/* 带前缀的输入框 */}
          <FormItem label="电话号码 (带前缀)" required error={errors.prefixedPhone}>
            <Controller
              name="prefixedPhone"
              control={control}
              rules={{
                required: '请输入电话号码',
                pattern: {
                  value: /^1[3-9]\d{9}$/,
                  message: '请输入正确的手机号码'
                }
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <PrefixInput
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                  prefix="+86"
                  placeholder="请输入手机号码"
                />
              )}
            />
          </FormItem>

          {/* 自定义选择器 */}
          <FormItem label="自定义选择器" required error={errors.customGender}>
            <Controller
              name="customGender"
              control={control}
              rules={{ required: '请选择性别' }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomSelect
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                  placeholder="请选择性别"
                  options={[
                    { value: 'male', label: '男性' },
                    { value: 'female', label: '女性' },
                    { value: 'other', label: '其他' }
                  ]}
                />
              )}
            />
          </FormItem>

          {/* 标签输入组件 */}
          <FormItem label="技能标签" error={errors.tags}>
            <Controller
              name="tags"
              control={control}
              rules={{
                validate: (value) => {
                  if (!value || value.length === 0) {
                    return '请至少添加一个标签';
                  }
                  return true;
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TagInput
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  placeholder="输入技能后按回车添加"
                />
              )}
            />
          </FormItem>

          {/* 方法3: 使用 useController Hook 的组件 */}
          <FormItem label="控制输入 (useController)" required>
            <ControlledInputWithHook
              name="controlledInput"
              control={control}
              rules={{
                required: '请输入内容',
                minLength: { value: 3, message: '至少3个字符' }
              }}
              placeholder="使用 useController Hook 的输入框"
            />
          </FormItem>

          {/* 使用 useController 的计数器组件 */}
          <FormItem label="计数器 (useController)" error={errors.counter}>
            <CounterInput
              name="counter"
              control={control}
              rules={{
                validate: (value) => {
                  if (value < 1) {
                    return '计数器值必须大于 0';
                  }
                  return true;
                }
              }}
            />
          </FormItem>

        </div>

        {/* 说明文档 */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '4px'
        }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#856404' }}>📚 自定义组件使用说明</h4>
          <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#856404' }}>
            <h5>1. register 方法 (普通组件)</h5>
            <p>• 适用于标准 HTML 表单元素 (input, select, textarea)</p>
            <p>• 直接使用 {`{...register('fieldName', rules)}`}</p>
            <p>• 自动处理 value、onChange、onBlur、ref</p>

            <h5>2. Controller 组件 (自定义组件)</h5>
            <p>• 适用于任何自定义组件</p>
            <p>• 通过 render prop 获取 field 对象</p>
            <p>• 手动传递 value、onChange、onBlur、ref</p>
            <p>• <strong>适合用于 JSX 中临时包装组件</strong></p>

            <h5>3. useController Hook (自定义组件)</h5>
            <p>• 在组件内部使用的 Hook</p>
            <p>• 返回 field、fieldState、formState 对象</p>
            <p>• 适合封装成独立的可复用组件</p>
            <p>• <strong>推荐用于组件库开发</strong></p>

            <h5>4. 三种方法的选择指南</h5>
            <div style={{
              backgroundColor: '#e8f5e8',
              padding: '10px',
              borderRadius: '4px',
              marginTop: '10px',
              border: '1px solid #4caf50'
            }}>
              <p><strong>🚀 register</strong>: 最简单，适合原生 HTML 元素</p>
              <p><strong>🎯 Controller</strong>: 适合一次性使用的自定义组件</p>
              <p><strong>⚙️ useController</strong>: 适合封装可复用的组件库</p>
            </div>

            <h5>5. 自定义组件要求</h5>
            <p>• 必须接受 value、onChange、onBlur 参数</p>
            <p>• onChange 调用时传递实际值 (不是 event 对象)</p>
            <p>• 支持 ref 转发 (可选，用于聚焦)</p>

            <h5>6. setValue 的使用要点</h5>
            <div style={{
              backgroundColor: '#fff2e6',
              padding: '10px',
              borderRadius: '4px',
              marginTop: '10px',
              border: '1px solid #ff9800'
            }}>
              <p><strong>🔧 setValue 支持所有类型的组件</strong></p>
              <p>• <code>register</code> 组件：直接设置值</p>
              <p>• <code>Controller</code> 组件：通过 render prop 传递</p>
              <p>• <code>useController</code> 组件：自动触发 hook 更新</p>
              <p>• 支持 <code>shouldValidate</code> 和 <code>shouldDirty</code> 选项</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step0;