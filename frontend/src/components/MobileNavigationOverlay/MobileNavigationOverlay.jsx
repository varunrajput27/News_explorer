const MobileNavigationOverlay = ({ mobileWidth, children }) => {
  return mobileWidth ? (
    <div className="w-[90%] flex flex-col items-start">{children}</div>
  ) : (
    <>{children}</>
  );
};

export default MobileNavigationOverlay;
