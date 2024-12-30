// 'use client';
// import { FRoundButton } from '@/components/common/Button';
// import Icon from '@/components/common/Icon';
// import FTypography from '@/components/common/Typography';
// import useCustomRouter from '@/hooks/useCustomRouter';

const Custom404 = () => {
  // const { push } = useCustomRouter();
  // const handleClickHome = () => {
  //   push('/');
  // };

  return (
    <div className="flex  flex-col justify-start items-center">
      {/* <div className="mt-[262px]">
        <Icon icon="error" width={154} height={184} />
      </div>
      <FTypography sx={{ marginTop: '12px' }} type="heading5" text="페이지를 찾을 수 없습니다" />
      <FTypography
        sx={{ marginTop: '8px', whiteSpace: 'pre-wrap', textAlign: 'center' }}
        type="body2"
        text={`${'입력하신 페이지의 주소가 정확한지 다시한번\n확인해주세요.'}`}
      />
      <div className="mt-6">
        <FRoundButton sx={{ background: '#EBEBEB' }} size="medium" text="홈으로 이동" onClick={handleClickHome} />
      </div> */}
      페이지를 찾을 수 없습니다.
      입력하신 페이지의 주소가 정확한지 다시한번\n확인해주세요.
    </div>
  );
};

export default Custom404;
