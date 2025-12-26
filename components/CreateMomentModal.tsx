import React, { useState } from 'react';
import { X, Image as ImageIcon, Gift, Ticket, Loader2, Check, Share2 } from 'lucide-react';
import { toast } from 'sonner';

type MomentType = 'moment' | 'redpack' | 'coupon';
type RedpackRecipientMode = 'select-now' | 'select-later';

interface CreateMomentModalProps {
  isOpen: boolean;
  onClose: () => void;
  placeName: string;
}

interface Friend {
  id: string;
  name: string;
  avatar: string;
}

// Mock friends data
const MOCK_FRIENDS: Friend[] = [
  {
    id: '1',
    name: '小林',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
  },
  {
    id: '2',
    name: '设计师',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
  },
  {
    id: '3',
    name: 'Coffee Lover',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
  },
  {
    id: '4',
    name: '旅行者',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
  },
  {
    id: '5',
    name: '摄影师',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
  },
];

const MOMENT_TYPES = [
  {
    id: 'moment' as const,
    icon: ImageIcon,
    label: 'Moment',
    description: '分享图片和想法',
  },
  {
    id: 'redpack' as const,
    icon: Gift,
    label: '红包',
    description: '通过 Apple Pay 赠送',
  },
  {
    id: 'coupon' as const,
    icon: Ticket,
    label: '优惠券',
    description: '分享专属优惠',
  },
];

export function CreateMomentModal({ isOpen, onClose, placeName }: CreateMomentModalProps) {
  const [selectedType, setSelectedType] = useState<MomentType>('moment');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [amount, setAmount] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [redpackMode, setRedpackMode] = useState<RedpackRecipientMode>('select-now');
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [createdRedpackId, setCreatedRedpackId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    // Validation
    if (selectedType === 'moment') {
      if (!content.trim() && images.length === 0) {
        toast.error('请添加内容或图片');
        return;
      }
    } else if (selectedType === 'redpack') {
      if (!amount || parseFloat(amount) <= 0) {
        toast.error('请输入有效金额');
        return;
      }
      if (redpackMode === 'select-now' && selectedFriends.length === 0) {
        toast.error('请选择至少一位朋友');
        return;
      }
    } else if (selectedType === 'coupon') {
      if (!couponCode.trim()) {
        toast.error('请输入优惠券码');
        return;
      }
    }

    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);

    const typeLabel = MOMENT_TYPES.find(t => t.id === selectedType)?.label || '';
    
    // For redpack with "select later" mode, show share dialog
    if (selectedType === 'redpack' && redpackMode === 'select-later') {
      setCreatedRedpackId('redpack_' + Date.now());
      setShowShareDialog(true);
      toast.success(`${typeLabel} 已创建`, {
        description: '可以通过转发发送给朋友',
      });
    } else {
      handleClose();
      toast.success(`${typeLabel} 已发布`, {
        description: `已成功添加到 ${placeName}`,
      });
    }
  };

  const handleClose = () => {
    setSelectedType('moment');
    setContent('');
    setImages([]);
    setAmount('');
    setCouponCode('');
    setSelectedFriends([]);
    setRedpackMode('select-now');
    setShowShareDialog(false);
    setCreatedRedpackId(null);
    onClose();
  };

  const handleShare = () => {
    toast.success('已复制转发链接', {
      description: '可以分享给任何朋友',
    });
    handleClose();
  };

  const handleAddImage = () => {
    // Simulate image upload
    const mockImage = `https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400`;
    setImages([...images, mockImage]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const toggleFriend = (friendId: string) => {
    setSelectedFriends(prev =>
      prev.includes(friendId)
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    );
  };

  // Share Dialog
  if (showShareDialog) {
    return (
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 backdrop-blur-sm">
        <div className="w-full max-w-2xl bg-background rounded-t-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl text-foreground mb-2">红包已创建</h2>
            <p className="text-sm text-muted-foreground mb-6">
              ¥{amount} · 在 {placeName}
            </p>

            <div className="space-y-3">
              <button
                onClick={handleShare}
                className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-full hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                <span>转发给朋友</span>
              </button>
              <button
                onClick={handleClose}
                className="w-full py-3 px-6 bg-secondary text-secondary-foreground rounded-full hover:bg-accent transition-all duration-300"
              >
                稍后再发
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (isSubmitting) {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <Loader2 className="w-16 h-16 text-primary animate-spin mb-6" />
          <h2 className="text-xl text-foreground mb-2">正在发布...</h2>
          <p className="text-sm text-muted-foreground">请稍候</p>
        </div>
      );
    }

    return (
      <>
        {/* Type Switcher */}
        <div className="flex items-center gap-2 px-6 py-4 border-b border-border overflow-x-auto">
          {MOMENT_TYPES.map((type) => {
            const Icon = type.icon;
            const isActive = selectedType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-secondary text-secondary-foreground hover:bg-accent'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{type.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {selectedType === 'moment' && (
            <>
              {/* Text Input */}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="分享你的想法..."
                rows={6}
                className="w-full px-4 py-3 bg-input-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
              />

              {/* Image Grid */}
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {images.map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Image Button */}
              <button
                onClick={handleAddImage}
                className="w-full py-3 px-4 bg-secondary text-secondary-foreground rounded-xl hover:bg-accent transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ImageIcon className="w-5 h-5" />
                <span>添加图片</span>
              </button>
            </>
          )}

          {selectedType === 'redpack' && (
            <>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">祝福语</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="写下你的祝福..."
                  rows={4}
                  className="w-full px-4 py-3 bg-input-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">金额</label>
                <div className="flex items-center gap-3">
                  <span className="text-2xl text-foreground">¥</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 px-4 py-3 bg-input-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">通过 Apple Pay 支付</p>
              </div>

              {/* Recipient Mode Selection */}
              <div>
                <label className="block text-sm text-muted-foreground mb-3">发送方式</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setRedpackMode('select-now')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      redpackMode === 'select-now'
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-background hover:border-primary/30'
                    }`}
                  >
                    <div className="text-center">
                      <p className="text-sm text-foreground mb-1">现在选择</p>
                      <p className="text-xs text-muted-foreground">直接发送给好友</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setRedpackMode('select-later')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      redpackMode === 'select-later'
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-background hover:border-primary/30'
                    }`}
                  >
                    <div className="text-center">
                      <p className="text-sm text-foreground mb-1">稍后选择</p>
                      <p className="text-xs text-muted-foreground">创建后转发</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Friend Selection - Only show if "select now" is chosen */}
              {redpackMode === 'select-now' && (
                <div>
                  <label className="block text-sm text-muted-foreground mb-3">
                    选择朋友 {selectedFriends.length > 0 && `(${selectedFriends.length})`}
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {MOCK_FRIENDS.map((friend) => {
                      const isSelected = selectedFriends.includes(friend.id);
                      return (
                        <button
                          key={friend.id}
                          onClick={() => toggleFriend(friend.id)}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                            isSelected
                              ? 'bg-primary/10 border-primary'
                              : 'bg-background border-border hover:border-primary/30'
                          }`}
                        >
                          <img
                            src={friend.avatar}
                            alt={friend.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <span className="flex-1 text-left text-sm text-foreground">
                            {friend.name}
                          </span>
                          {isSelected && (
                            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {selectedType === 'coupon' && (
            <>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">优惠券码</label>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="输入优惠券码"
                  className="w-full px-4 py-3 bg-input-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all uppercase"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">有效期（可选）</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-input-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">使用说明（可选）</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="说明如何使用这张优惠券..."
                  rows={3}
                  className="w-full px-4 py-3 bg-input-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                />
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-border">
          <button
            onClick={handleSubmit}
            className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-full hover:shadow-md transition-all duration-300"
          >
            {selectedType === 'redpack' && redpackMode === 'select-later' ? '创建红包' : '发布'}
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-background rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="relative px-6 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-xl text-foreground">创建内容</h2>
            <p className="text-sm text-muted-foreground mt-0.5">在 {placeName}</p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-muted hover:bg-accent transition-colors flex items-center justify-center"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}