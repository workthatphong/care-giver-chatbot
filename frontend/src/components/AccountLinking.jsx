import React, { useState, useEffect } from 'react';
import { Link2, CheckCircle2, ChevronLeft, Plus } from 'lucide-react';

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 48 48">
    <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
    <path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
  </svg>
);

const LineIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 48 48">
    <path fill="#00c300" d="M12.5,42h23c3.59,0,6.5-2.91,6.5-6.5v-23C42,8.91,39.09,6,35.5,6h-23C8.91,6,6,8.91,6,12.5v23C6,39.09,8.91,42,12.5,42z"></path>
    <path fill="#fff" d="M37.113,22.417c0-5.865-5.88-10.637-13.107-10.637s-13.108,4.772-13.108,10.637c0,5.258,4.663,9.662,10.962,10.495c0.427,0.092,1.008,0.282,1.155,0.646c0.132,0.331,0.086,0.85,0.042,1.185c0,0-0.153,0.925-0.187,1.122c-0.057,0.331-0.263,1.296,1.135,0.707c1.399-0.589,7.548-4.445,10.298-7.611h-0.001C36.203,26.879,37.113,24.764,37.113,22.417z M18.875,25.907h-2.604c-0.379,0-0.687-0.308-0.687-0.688V20.01c0-0.379,0.308-0.687,0.687-0.687c0.379,0,0.687,0.308,0.687,0.687v4.521h1.917c0.379,0,0.687,0.308,0.687,0.687C19.562,25.598,19.254,25.907,18.875,25.907z M21.568,25.219c0,0.379-0.308,0.688-0.687,0.688s-0.687-0.308-0.687-0.688V20.01c0-0.379,0.308-0.687,0.687-0.687s0.687,0.308,0.687,0.687V25.219z M27.838,25.219c0,0.297-0.188,0.559-0.47,0.652c-0.071,0.024-0.145,0.036-0.218,0.036c-0.215,0-0.42-0.103-0.549-0.275l-2.669-3.635v3.222c0,0.379-0.308,0.688-0.688,0.688c-0.379,0-0.688-0.308-0.688-0.688V20.01c0-0.296,0.189-0.558,0.47-0.652c0.071-0.024,0.144-0.035,0.218-0.035c0.214,0,0.42,0.103,0.549,0.275l2.67,3.635V20.01c0-0.379,0.309-0.687,0.688-0.687c0.379,0,0.687,0.308,0.687,0.687V25.219z M32.052,21.927c0.379,0,0.688,0.308,0.688,0.688c0,0.379-0.308,0.687-0.688,0.687h-1.917v1.23h1.917c0.379,0,0.688,0.308,0.688,0.687c0,0.379-0.309,0.688-0.688,0.688h-2.604c-0.378,0-0.687-0.308-0.687-0.688v-2.603c0-0.001,0-0.001,0-0.001c0,0,0-0.001,0-0.001v-2.601c0-0.001,0-0.001,0-0.002c0-0.379,0.308-0.687,0.687-0.687h2.604c0.379,0,0.688,0.308,0.688,0.687s-0.308,0.687-0.688,0.687h-1.917v1.23H32.052z"></path>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 50 50">
    <path fill="#6b7280" d="M 14 3.9902344 C 8.4886661 3.9902344 4 8.4789008 4 13.990234 L 4 35.990234 C 4 41.501568 8.4886661 45.990234 14 45.990234 L 36 45.990234 C 41.511334 45.990234 46 41.501568 46 35.990234 L 46 13.990234 C 46 8.4789008 41.511334 3.9902344 36 3.9902344 L 14 3.9902344 z M 18.005859 12.033203 C 18.633859 12.060203 19.210594 12.414031 19.558594 12.957031 C 19.954594 13.575031 20.569141 14.534156 21.369141 15.785156 C 22.099141 16.926156 22.150047 18.399844 21.498047 19.589844 L 20.033203 21.673828 C 19.637203 22.237828 19.558219 22.959703 19.824219 23.595703 C 20.238219 24.585703 21.040797 26.107203 22.466797 27.533203 C 23.892797 28.959203 25.414297 29.761781 26.404297 30.175781 C 27.040297 30.441781 27.762172 30.362797 28.326172 29.966797 L 30.410156 28.501953 C 31.600156 27.849953 33.073844 27.901859 34.214844 28.630859 C 35.465844 29.430859 36.424969 30.045406 37.042969 30.441406 C 37.585969 30.789406 37.939797 31.366141 37.966797 31.994141 C 38.120797 35.558141 35.359641 37.001953 34.556641 37.001953 C 34.000641 37.001953 27.316344 37.761656 19.777344 30.222656 C 12.238344 22.683656 12.998047 15.999359 12.998047 15.443359 C 12.998047 14.640359 14.441859 11.879203 18.005859 12.033203 z"></path>
  </svg>
);

export const providersList = [
  { id: 'Google', name: 'Google', icon: <GoogleIcon /> },
  { id: 'Facebook', name: 'Facebook', icon: <FacebookIcon /> },
  { id: 'Line', name: 'LINE', icon: <LineIcon /> },
  { id: 'Phone', name: 'เบอร์โทรศัพท์', icon: <PhoneIcon /> }
];

const AccountLinking = ({ linkedAccounts = [], onChange, readOnly = false }) => {
  const [linkState, setLinkState] = useState('idle'); 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  const handleLink = (providerId) => {
    if (providerId === 'Phone') {
      setLinkState('phone_input');
    } else {
      if (!linkedAccounts.includes(providerId)) {
        onChange([...linkedAccounts, providerId]);
      }
      setLinkState('idle');
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault(); // prevent form submit if in EditModal
    if (phoneNumber.length >= 9) {
      setLinkState('otp_input');
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.length > 3) {
      if (!linkedAccounts.includes('Phone')) {
        onChange([...linkedAccounts, 'Phone']);
      }
      setLinkState('idle');
      setPhoneNumber('');
      setOtp('');
    }
  };

  const removeLink = (providerId) => {
    onChange(linkedAccounts.filter(id => id !== providerId));
  };

  if (readOnly) {
    return (
      <div className="mt-8 border-t border-gray-100 pt-6 animate-popUp">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 border border-purple-100 shadow-sm">
            <Link2 className="w-3.5 h-3.5" />
          </div>
          <h4 className="text-sm font-semibold text-gray-800 tracking-wide">บัญชีที่ผูกไว้</h4>
        </div>
        
        {linkedAccounts && linkedAccounts.length > 0 ? (
          <div className="flex flex-wrap gap-2.5">
            {linkedAccounts.map(acc => {
              const provider = providersList.find(p => p.id === acc);
              if (!provider) return null;
              return (
                <div key={acc} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <div className="w-5 h-5 flex items-center justify-center">{provider.icon}</div>
                  <span className="text-[13px] font-medium text-gray-700">{provider.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 ml-0.5" />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 border-dashed text-center">
            <span className="text-sm text-gray-400">ยังไม่มีการผูกบัญชี</span>
          </div>
        )}
      </div>
    );
  }

  // Interactive Mode
  return (
    <div className="mt-4 col-span-2">
      <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-[0_4px_20px_rgba(168,85,247,0.05)] relative overflow-hidden">
        
        {/* Background Decoration */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-50 rounded-full blur-2xl opacity-50 pointer-events-none"></div>

        <div className="flex items-center gap-2 mb-4 relative z-10">
          <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shadow-sm">
            <Link2 className="w-3.5 h-3.5" />
          </div>
          <h4 className="text-sm font-semibold text-gray-800 tracking-wide">ระบบผูกบัญชี (Account Linking)</h4>
        </div>

        {/* State: Idle */}
        {linkState === 'idle' && (
          <div className="relative z-10">
            {linkedAccounts && linkedAccounts.length > 0 ? (
              <div className="space-y-4">
                <p className="text-[12px] text-gray-400 font-medium tracking-wide uppercase">ช่องทางที่ผูกไว้แล้ว</p>
                <div className="flex flex-wrap gap-2.5">
                  {linkedAccounts.map(acc => {
                    const provider = providersList.find(p => p.id === acc);
                    if (!provider) return null;
                    return (
                      <div key={acc} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] animate-popUp group">
                        <div className="w-5 h-5 flex items-center justify-center">{provider.icon}</div>
                        <span className="text-[13px] font-medium text-gray-700">{provider.name}</span>
                        <button 
                          type="button" 
                          onClick={() => removeLink(acc)}
                          className="ml-1 text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                      </div>
                    );
                  })}
                </div>
                
                {linkedAccounts.length < 4 && (
                  <button 
                    type="button"
                    onClick={() => setLinkState('selecting')}
                    className="mt-5 w-full py-2.5 rounded-xl border border-dashed border-gray-300 text-gray-500 text-sm font-medium hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50/50 transition-all flex items-center justify-center gap-2 outline-none"
                  >
                    <Plus className="w-4 h-4" /> ผูกบัญชีเพิ่มเติม
                  </button>
                )}
              </div>
            ) : (
              <button 
                type="button"
                onClick={() => setLinkState('selecting')}
                className="w-full py-3 rounded-xl bg-purple-50 text-purple-600 font-medium hover:bg-purple-100 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm outline-none border border-purple-100"
              >
                <Link2 className="w-4 h-4" /> เริ่มต้นการผูกบัญชี
              </button>
            )}
          </div>
        )}

        {/* State: Selecting */}
        {linkState === 'selecting' && (
          <div className="animate-popUp relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <button type="button" onClick={() => setLinkState('idle')} className="p-1 hover:bg-gray-50 rounded-full text-gray-400 hover:text-gray-600 transition-colors outline-none">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <p className="text-sm font-semibold text-gray-800">เลือกช่องทางที่ต้องการผูก</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {providersList.filter(p => !linkedAccounts.includes(p.id)).map(provider => (
                <button 
                  type="button"
                  key={provider.id}
                  onClick={() => handleLink(provider.id)}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:border-purple-200 hover:shadow-sm hover:bg-purple-50/50 transition-all text-left group outline-none"
                >
                  <div className="w-8 h-8 shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {provider.icon}
                  </div>
                  <span className="text-[13px] font-medium text-gray-700 group-hover:text-purple-700 transition-colors">{provider.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* State: Phone Input */}
        {linkState === 'phone_input' && (
          <div className="animate-popUp relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <button type="button" onClick={() => setLinkState('selecting')} className="p-1 hover:bg-gray-50 rounded-full text-gray-400 hover:text-gray-600 transition-colors outline-none">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <p className="text-sm font-semibold text-gray-800">กรอกเบอร์โทรศัพท์</p>
            </div>
            <div className="flex gap-2">
              <input 
                type="tel" 
                placeholder="08X-XXX-XXXX" 
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 focus:bg-white focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-100/50 transition-all text-sm font-medium tracking-wide"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button 
                type="button"
                onClick={handleSendOtp}
                disabled={phoneNumber.length < 9}
                className="px-5 py-2.5 rounded-xl bg-purple-500 text-white font-medium hover:bg-purple-600 disabled:opacity-40 transition-all text-sm shadow-[0_4px_12px_rgba(168,85,247,0.25)] outline-none"
              >
                ส่ง OTP
              </button>
            </div>
          </div>
        )}

        {/* State: OTP Input */}
        {linkState === 'otp_input' && (
          <div className="animate-popUp flex flex-col items-center py-2 relative z-10">
            <p className="text-sm font-semibold text-gray-800 mb-1">กรอกรหัส OTP</p>
            <p className="text-[11px] text-gray-400 mb-4 text-center px-4">
              ระบบได้ส่งรหัสไปยังเบอร์ <span className="font-semibold text-gray-600">{phoneNumber}</span> แล้ว
            </p>
            
            <div className="mb-5 w-full max-w-[200px]">
              <input 
                type="text" 
                maxLength={6}
                placeholder="------" 
                className="w-full text-center tracking-[0.75em] px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 focus:bg-white focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-100/50 transition-all text-xl font-bold"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            
            <div className="flex w-full gap-3">
              <button 
                type="button"
                onClick={() => setLinkState('phone_input')}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors text-sm outline-none"
              >
                ย้อนกลับ
              </button>
              <button 
                type="button"
                onClick={handleVerifyOtp}
                disabled={otp.length < 4}
                className="flex-1 py-2.5 rounded-xl bg-purple-500 text-white font-medium hover:bg-purple-600 disabled:opacity-40 transition-all text-sm shadow-[0_4px_12px_rgba(168,85,247,0.25)] outline-none"
              >
                ยืนยัน OTP
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AccountLinking;
