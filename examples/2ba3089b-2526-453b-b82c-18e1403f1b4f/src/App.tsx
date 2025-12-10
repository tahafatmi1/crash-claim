import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Eraser } from 'lucide-react';

function App() {
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Simple grammar checks (这里使用简单的示例检查规则)
  const checkGrammar = (input: string) => {
    const newSuggestions: string[] = [];
    
    // 检查重复词
    const words = input.split(' ');
    for (let i = 0; i < words.length - 1; i++) {
      if (words[i] === words[i + 1]) {
        newSuggestions.push(`发现重复词："${words[i]}"`);
      }
    }

    // 检查标点符号
    if (input.includes(',.')) {
      newSuggestions.push('逗号和句号不应该连用');
    }

    // 检查句子结尾
    if (input.length > 0 && !input.match(/[。！？\.!?]$/)) {
      newSuggestions.push('句子结尾缺少标点符号');
    }

    // 如果没有错误
    if (newSuggestions.length === 0 && input.length > 0) {
      newSuggestions.push('没有发现明显的语法错误！');
    }

    setSuggestions(newSuggestions);
  };

  const clearText = () => {
    setText('');
    setSuggestions([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">文本检查助手</h1>
          <p className="text-gray-600">输入文本，我们将帮助检查可能存在的语法问题</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="在此输入需要检查的文本..."
            />
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => checkGrammar(text)}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              检查文本
            </button>
            <button
              onClick={clearText}
              className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
            >
              <Eraser className="w-5 h-5" />
              清空文本
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              检查结果
            </h2>
            {suggestions.length > 0 ? (
              <ul className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className={`p-3 rounded-lg ${
                      suggestion.includes('没有发现') 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center">请输入文本并点击"检查文本"按钮</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;